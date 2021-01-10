import {takeLatest, takeLeading, takeEvery} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {registerSaga, loginSaga} from './authSagas';
import {getAllUsers,updatePassSaga,recoverySaga, privateSaga, updateUserData, notAuthorizeSaga, headerRequest} from './userSaga';
import {paymentSaga, cashoutSaga} from './paymentSaga';
import {
    getContests,
    addNewContest,
    activeContestsSaga,
    customerContestsSaga,
    updateContestSaga,
    dataForContestSaga,
    getContestByIdSaga,
    downloadContestFileSaga
} from './contestsSagas'
import {acceptOffer,getOffers,addNewOfferSaga,changeMarkSaga, setOfferStatusSaga, addOfferSaga} from './offerSagas';
import {
    previewSaga,
    getDialog,
    sendMessage,
    changeChatFavorite,
    changeChatBlock,
    getCatalogListSaga,
    addChatToCatalog,
    createCatalog,
    deleteCatalog,
    removeChatFromCatalogSaga,
    changeCatalogName
} from './chatSagas';

function* rootSaga() {
    yield  takeLatest(ACTION.ACCEPT_OFFER, acceptOffer)
    yield  takeEvery(ACTION.GET_CONTESTS, getContests)
    yield  takeEvery(ACTION.GET_OFFERS, getOffers)
    yield  takeEvery(ACTION.GET_ALL_USERS, getAllUsers)
    yield  takeLatest(ACTION.ADD_NEW_CONTEST_EVENT, addNewContest)
    yield  takeLatest(ACTION.ADD_NEW_OFFER_EVENT, addNewOfferSaga)
    yield  takeLatest(ACTION.AUTH_ACTION_PASS_RECOVERY, recoverySaga);
    yield  takeLatest(ACTION.ACTION_UPDATE_PASS, updatePassSaga);

    yield  takeLatest(ACTION.AUTH_ACTION_REGISTER, registerSaga);
    yield  takeLatest(ACTION.AUTH_ACTION_LOGIN, loginSaga);
    yield  takeEvery(ACTION.GET_USER_ACTION, privateSaga);
    yield  takeEvery(ACTION.GET_DATA_FOR_CONTEST_ACTION, dataForContestSaga);
    yield  takeLatest(ACTION.PAYMENT_ACTION, paymentSaga);
    yield  takeLatest(ACTION.CASHOUT_ACTION, cashoutSaga);
    yield  takeLeading(ACTION.GET_CONTESTS_FOR_CUSTOMER, customerContestsSaga);
    yield  takeLatest(ACTION.GET_CONTEST_BY_ID_ACTION, getContestByIdSaga);
    yield  takeEvery(ACTION.GET_CONTESTS_FOR_CREATIVE, activeContestsSaga);
    yield  takeLatest(ACTION.DOWNLOAD_CONTEST_FILE_ACTION, downloadContestFileSaga);
    yield  takeLatest(ACTION.UPDATE_CONTEST_ACTION, updateContestSaga);
    yield  takeEvery(ACTION.SET_OFFER_ACTION, addOfferSaga);
    yield  takeLatest(ACTION.SET_OFFER_STATUS_ACTION, setOfferStatusSaga);
    yield  takeLatest(ACTION.CHANGE_MARK_ACTION, changeMarkSaga);
    yield  takeLatest(ACTION.UPDATE_USER_DATA, updateUserData);
    yield  takeLatest(ACTION.ONLY_FOR_NOT_AUTHORIZE_USERS, notAuthorizeSaga);
    yield  takeLatest(ACTION.HEADER_REQUEST_AUTHORIZE, headerRequest);
    yield  takeLatest(ACTION.GET_PREVIEW_CHAT_ASYNC, previewSaga);
    yield  takeLatest(ACTION.GET_DIALOG_MESSAGES_ASYNC, getDialog);
    yield  takeLatest(ACTION.SEND_MESSAGE_ACTION, sendMessage);
    yield  takeLatest(ACTION.SET_CHAT_FAVORITE_FLAG, changeChatFavorite);
    yield  takeLatest(ACTION.SET_CHAT_BLOCK_FLAG, changeChatBlock);
    yield  takeLatest(ACTION.GET_CATALOG_LIST_ASYNC, getCatalogListSaga);
    yield  takeLatest(ACTION.ADD_CHAT_TO_CATALOG_ASYNC, addChatToCatalog);
    yield  takeLatest(ACTION.CREATE_CATALOG_REQUEST, createCatalog);
    yield  takeLatest(ACTION.DELETE_CATALOG_REQUEST,deleteCatalog);
    yield  takeLatest(ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,removeChatFromCatalogSaga);
    yield  takeLatest(ACTION.CHANGE_CATALOG_NAME_REQUEST,changeCatalogName);
}

export default rootSaga;