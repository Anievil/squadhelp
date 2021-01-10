const db = require('../models/index');
import ServerError from '../errors/ServerError';
import RightsError from '../errors/RightsError'
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../../socketInit');
const UtilFunctions = require('../utils/functions');
const NotFound = require('../errors/UserNotFoundError');
const CONSTANTS = require('../../constants');
const sendMail = require('./sendMail')

module.exports.acceptOffer = async (req, res, next) => {
  try{
    const foundUser = await userQueries.findUser({accessToken: req.body.token})
    console.log(foundUser.role)
    if(foundUser.role === 'moderator'){
      const findOffer = await contestQueries.findOffer({id: req.body.id})
      for(let i in findOffer){
        console.log(i + ' ' + findOffer[i])
      }
      db.Offers.update({status: req.body.status},{ where: {id: findOffer.id}})
    }
    else{
      next(new RightsError('you cant do it'))
    }
  }catch(e){
    next(new ServerError('smth wrong, try again later'))
  }
}

module.exports.newgetContests = async (req, res, next) => {
  try{
    const foundContests = await db.Contests.findAll()
    
    res.send(foundContests)
    console.log('ok')
  }catch(e){
    next(new ServerError('smth wrong, try again later'))
  }
}

module.exports.getOffers = async (req, res, next) => {
  try{
    const foundUser = await userQueries.findUser({accessToken: req.body.token})
    let foundOffer
    if(foundUser.role === 'creator'){
      foundOffer = await db.Offers.findAll({where: {userId: foundUser.id}})
    }else if(foundUser.role === 'moderator'){
      foundOffer = await db.Offers.findAll()
    }else{
      next(new RightsError('you cant watch it'));
    }
    
    res.send(foundOffer)
    console.log('ok')
  }catch(err){
    next(new ServerError('cant add new contest'));
  }
}

module.exports.addNewContest = async (req, res, next) => {
  try{
    const offerData = await contestQueries.findOffer({originalFileName: req.body.originalFileName})
    const userData = await userQueries.findUser({id : offerData.userId})
    const newContestData = {offerId: offerData.id, userId: userData.id, contestType: req.body.contestType, fileName: offerData.fileName , originalFileName: req.body.originalFileName, title: req.body.title, typeOfName: req.body.typeOfName, industry: req.body.industry, focusOfWork: req.body.focusOfWork, targetCustomer: req.body.targetCustomer, styleName: req.body.styleName, nameVenture: req.body.nameVenture, typeOfTagline: req.body.typeOfTagline, brandStyle: req.body.brandStyle, createdAt: req.body.createdAt, status: req.body.status, prize: req.body.prize, priority: req.body.priority}
    if(offerData.status === 'accept' && userData.token === req.body.token){
      await contestQueries.createContest(newContestData)
    }else{
      next(new ServerError('moderator dont accept your offer or its not your offer'));
    }
  }catch(err){
    next(new ServerError('cant add new contest'));
  }
}

module.exports.addNewOffer = async (req, res, next) => {
  try{
    const findOfferCreator = await userQueries.findUser({accessToken : req.body.token})
    // console.log('find user by token ' + findOfferCreator.firstName + ' desc(text) ' + req.body.text + ' name ' + req.body.fileName + ' originalName ' + req.body.originalFileName)
    if(findOfferCreator.role === 'creator'){
      const newOfferData = {userId: findOfferCreator.id, text: req.body.text, fileName: req.body.fileName, originalFileName: req.body.originalFileName}
      await contestQueries.createOffer(newOfferData)
      const findModer = await userQueries.findUser({role: 'moderator'})
      sendMail.mailAboutNewOffer(findOfferCreator, newOfferData, findModer.email)
    }
    else{
      next(new RightsError('Only creator can create offers'))
    }
  }catch(err){
    next(new ServerError('cant add new offer'));
  }
}

module.exports.dataForContest = async (req, res, next) => {
  let response = {};
  try {
    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: [
            req.body.characteristic1,
            req.body.characteristic2,
            'industry',
          ],
        },
      },
    });
    if ( !characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if ( !response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await db.Contests.findOne({
      where: { id: req.headers.contestid },
      order: [
        [db.Offers, 'id', 'asc'],
      ],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    let result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  return rejectedOffer;
};

const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId: orderId }, transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId: contestId,
  }, transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
      offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
    'Someone of yours offers was rejected', contestId);
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
  return updatedOffers[ 0 ].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId);
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(req.body.contestId,
        req.body.creatorId, req.body.orderId, req.body.offerId,
        req.body.priority, transaction);
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  db.Contests.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offers,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex,
    req.body.contestId, req.body.industry, req.body.awardSort);
  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Offers,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError());
    })
};