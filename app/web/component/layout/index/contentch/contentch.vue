<template>
    <div>
        <div class="menu-nav-wrap-full">
            <div class="menu-nav-wrap">
                <a class="menu-single-a menu-single-wrap" v-bind:class="{ 'menu-single-wrap-active' : index===0}" v-for="(item,index) in dataRes.labelList.list" @click="checkedActive($event)" :href="item.lb_name | targetName">
                {{item.lb_name}}
                </a>
            </div>
        </div>
        <div class="content-wrap">
            <h1 class="page-title">钢琴家-为你收藏前端程序员常用中文文档</h1>
            <div class="single-wrap-kuang" v-for="(labeItem,labeIndex) in dataRes.labelList.list" v-if="labeItem.docList.length > 0">
                <div class="label-name-wrap">
                    <div class="label-name" :id="labeItem.lb_name">{{labeItem.lb_name}}</div>
                </div>
                <div>
                    <div class="single-wrap" v-for="(docItem,docIndex) in labeItem.docList">
                        <a class="got-out" target="block" :href="docItem.doc_address">
                            <img class="logo lazyLoadImg" src="" :picAddress="docItem.doc_logo" :alt="docItem.doc_title"/>
                            <div class="right-content">
                                <div class="title">{{docItem.doc_title}}</div>
                                    <div class="desc" data-toggle="popover" title="title" data-content="Right?">{{docItem.doc_desc}}</div>
                                <div class="icon-wrap">
                                    <a v-if="docItem.doc_github !== null && docItem.doc_github !== ''" target="block" :href="docItem.doc_github"><img src="../../../../asset/images/github.png" class="github"/></a>
                                    <a target="block" :href="docItem.doc_address"><img src="../../../../asset/images/home.png" class="home"/></a>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="not-more">目前内容暂时只有这么多，我们在努力更新中...</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import '../../../../asset/css/mixin.scss';
    @import "./contentch.scss";
</style>
<script type="babel">
import $ from "jquery";
import Util from'../../../../asset/js/util.js';
import lazyLoadImages from'../../../../asset/js/lazyLoadImages.js';
import request from 'framework/network/request';
export default {
data(){
  return {
    defaultIndex:0,
    newList:[],
    reactList:[],
    labelData:[],
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'',
    labelList:[],
    menuShow:false,
    footerPosition:false,
  }
},
props:['dataRes'],
methods: {
    checkedActive(event){
        $(event.currentTarget).siblings().removeClass('menu-single-wrap-active');
        $(event.currentTarget).addClass('menu-single-wrap-active');
    }
},
filters:{
    targetName(data){
        return '#'+data;
    }
},
mounted() {
    lazyLoadImages.initConfig();
    // 自动爬虫（百度）
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    // 设置内容边距
    let marginTop = $('.container-fluid').height()+$('.menu-nav-wrap-full').height();
    if(Util.browserRedirect()){//移动端
        $('.content-wrap').css({
            'margin-top': marginTop + 1
        })
    }else{
        $('.content-wrap').css({
            'margin-top': marginTop + 10
        })
    }
    // a锚点
    const marginHeader = $('.container-fluid').height()+$('.menu-nav-wrap-full').height()+$('.page-title').height();
    $('.menu-single-a').click(function(){
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top - (marginTop+8) )},1000);
    });
},
}
</script>
