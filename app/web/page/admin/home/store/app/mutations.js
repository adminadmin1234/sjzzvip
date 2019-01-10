'use strict';
// 对服务端返回的结果做处理
import {
  GET_ARTICLE_DETAIL,

  SET_DOCUMENT_LIST,
  SET_DOCUMENT_MODIFY,
  SET_DOCUMENT_SAVE,
  DOCUMENT_DELETE,

  SET_LABEL_LIST,
  SET_LABEL_MODIFY,
  SET_LABEL_SAVE,
  LABEL_DELETE,

  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE
} from './mutation-type';

const mutations = {
  [GET_ARTICLE_DETAIL](state, data) {
    state.article = data.list[0];
    if (typeof state.article.atc_fileUrl !== 'undefined' && state.article.atc_fileUrl !== null) {
      const hrefFileUrl = state.article.atc_fileUrl.split('.')[0] + '/index.html';
      state.article.hrefFileUrl = hrefFileUrl;
    }
  },
  // 中文文档
  [SET_DOCUMENT_LIST](state, { list, total }) {
    state.documentTotal = total;
    state.documentList = list;
  },
  [SET_DOCUMENT_SAVE](state, data) {
    if (data.flag === 1) {
      state.addDialog = false;
    } else {
      state.addDialog = true;
    }
  },
  // 标签
  [SET_LABEL_LIST](state, { list, total }) {
    state.labelTotal = total;
    state.labelList = list;
  },
  [SET_LABEL_SAVE](state, data) {
    if (data.flag === 1) {
      state.addDialog = false;
    } else {
      state.addDialog = true;
    }
  },
  [SET_LABEL_MODIFY](state, data) {
    if (data.flag === 1) {
      state.addDialog = false;
    } else {
      state.addDialog = true;
    }
  },
  [LABEL_DELETE](state, { id }) {
    if (id !== null) {
      state.labelTotal -= 1;
      state.labelList = state.labelList.filter(item => {
        return item.lb_id !== id;
      });
    }
  },
  // 文章
  [SET_ARTICLE_LIST](state, { list, total }) {
    state.articleTotal = total;
    state.articleList = list;
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [SET_SAVE_ARTICLE](state, data) {
    console.log('data-SET_SAVE_ARTICLE1', data);
    state.changFlag = data;
  },
  [DELETE_ARTICLE](state, { id }) {
    state.articleTotal -= 1;
    state.articleList = state.articleList.filter(item => {
      return item.id !== id;
    });
  }
};
export default mutations;
