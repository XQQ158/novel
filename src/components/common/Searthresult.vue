<template>
  <div>
    <Header :title="header.title" :showBack="true"></Header>
    <loading v-if="isLoaded" />
    <div class="searchResult" :style="{ height: scrollHeight }" v-else>
      <cube-scroll>
        <div
          class="searchResult-item"
          v-for="item in bookdata"
          :key="item._id"
          @click="goread(item._id)"
        >
          <div class="searchResult-item-img">
            <img v-lazy="$store.state.imgHeader + item.cover" :key="item._id" />
          </div>
          <div class="searchResult-item-main">
            <p class="searchResult-item-name" v-text="item.title"></p>
            <p class="searchResult-item-author" v-text="item.author"></p>
            <p class="searchResult-item-intro" v-text="item.intro"></p>
            <p class="searchResult-item-more">
              <span style="color: #ed424b;" v-text="item.retentionRatio + '%留存'"></span>
              <span v-html="'&nbsp;&nbsp;|&nbsp;&nbsp;'"></span>
              <span style="color: #4284ed;" v-text="item.latelyFollower + '人气'"></span>
            </p>
          </div>
        </div>
      </cube-scroll>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
export default {
  data() {
    return {
      bookdata: [],
      isLoaded: true,
      header: {
        title: "搜素结果页"
      },
      re:false
    };
  },
  components: {
    Header,
    Footer,
    Loading
  },
 beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.getbook()
    })
},
  methods: {
    // 获取书籍
    getbook() {
      this.$axios.get(`api/book/fuzzy-search?query=${this.$route.query.name}`).then(res => {
        this.bookdata = res.data.books;
        this.isLoaded=false
      });
    },
    goread(id) {
      this.$router.push({ path: "/book", query: { id: id } });
    },
    // 可换过滤器，效果一样
    formatPeople(nums) {
      if (nums > 9999) {
        return parseFloat((nums / 10000).toFixed(1)) + "万";
      } else {
        return nums;
      }
    }
  },
  computed: {
    scrollHeight: function() {
      return (
        this.$store.state.clientHeight -
        (10.66667 * this.$store.state.clientWidth) / 100 +
        "px"
      );
    }
  }
};
</script>
<style lang="less" scoped>
.searchResult {
  background-color: #fff;
  .searchResult-item {
    padding: 10px 0;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    .searchResult-item-img {
      width: 66px;
      height: 88px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .searchResult-item-main {
      width: 280px;
      margin-left: 9px;
      font-size: 12px;
      color: #969ba3;
      flex: 1;
      .searchResult-item-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        padding-top: 6px;
        color: #333;
      }
      .searchResult-item-author {
        margin-bottom: 8px;
      }
      .searchResult-item-intro {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6px;
      }
    }
  }
}
</style>