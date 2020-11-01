<template>
<div :class="['search', SearchData.Result.State]">
  <div class="search-input">
    <Icon :isClickable="true" url="img/icons/Search.svg" width="24" height="24" @click="search()" />
    <input class="text" type="text" @keypress.enter="search()" placeholder="Reddit kullanıcı adını giriniz. Örn: AsimTahir, u/AsimTahir" v-model="SearchData.Username">
    <Icon :isClickable="true" :url="`url(${Redditor.ProfilePhoto.URL})`" v-show="Redditor.ProfilePhoto.URL" borderRadius="1em" width="48px" height="48px" :link="`https://reddit.com/user/${ParsedUsername}`" />
    <sync-loader class="loading" :loading="SearchData.IsLoading" color="#9daeb3" size="8px"></sync-loader>
  </div>
  <div class="caption" v-show="SearchData.Result.State">
    {{SearchData.Result.Caption}}
  </div>
</div>
</template>

<style lang="scss" scoped>
.search {
  font-family: 'Rubik', sans-serif;
  font-size: 10.5pt;
  font-weight: 500;

  width: 900px;
  height: 94px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  transition: all .2s;

  &-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;

    height: 64px;
    width: inherit;

    border-radius: 16px;
    background-color: map-get(map-get($Palette, Base), background);

    transition: all .2s;

    .loading {
      margin-right: 10px;
    }

    &:focus {
      border: 2px solid map-get(map-get($Palette, Base), focus-border);
      border-radius: 16px;
      transition: all .2s;
    }

    .text {
      height: 1.2em;

      border: none;
      background-color: inherit;
      color: map-get(map-get($Palette, Text), base);

      font-family: inherit;
      font-size: 1.2em;
      font-weight: normal;
      line-height: 1.2em;

      flex: 1;
      padding-right: 20px;

      &:focus {
        outline: none;
      }
    }
  }

  & .caption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    top: 10px;
    left: 10px;
  }

  &.success {
    & .caption {
      color: map-get(map-get($Palette, Text), success-dark);
      font-weight: 600;
    }
  }

  &.failure {
    & .caption {
      color: map-get(map-get($Palette, Text), failure-dark);
      font-weight: 600;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent
} from "vue";

import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';

import _ from 'lodash'
import moment from 'moment';
moment.locale('tr');

import Icon from '@/components/Icon.vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

type Data = {
  SearchData: {
    Username: string,
    RateLimit: {
      NextTry: moment.Moment,
      Amount: moment.DurationInputArg1,
      Unit: moment.DurationInputArg2,
      Left: moment.Duration
    }
    Result: {
      Caption: string
      State: string
    },
    IsLoading: boolean
  }
}

enum ResultState {
  Failure = 'failure',
    Success = 'success'
}

export default defineComponent({
  name: "Search",

  data(): Data {
    return {
      SearchData: {
        Username: 'EmirSkywalker9',
        RateLimit: {
          NextTry: moment(),
          Amount: 10,
          Unit: "seconds",
          Left: moment.duration()
        },
        Result: {
          Caption: '',
          State: '',
        },
        IsLoading: false
      }
    }
  },

  components: {
    Icon,
    SyncLoader
  },

  computed: {
    ParsedUsername(): string {
      const result = /([\w-]+)$/i.exec(this.SearchData.Username)
      return result == null ? "" : result[1];
    },

    ...mapState(['Redditor', 'Search']),
    ...mapGetters(
      [
        'FORMATTED_LAST_SUBMISSION_ACTIVITY_DATE',
        'FORMATTED_LAST_COMMENT_ACTIVITY_DATE',
        'PRINTABLE_LAST_COMMENT_ACTIVITY_DATE',
        'PRINTABLE_LAST_SUBMISSON_ACTIVITY_DATE'
      ]
    ),
  },

  methods: {
    ...mapMutations(
      [
        'SET_REDDITOR_USERNAME',
        'RESET_REDDITOR_PROFILE_PHOTO'
      ]
    ),

    ...mapActions(
      [
        'GET_API_REDDITOR_SUBMISSIONS',
        'GET_API_REDDITOR_COMMENTS',
        'GET_API_USERNAME_AVAILABLE',
        'GET_API_REDDITOR_DATA'
      ]
    ),

    async search(): Promise < void > {
      this.SearchData.IsLoading = true;

      this.SearchData.Result.State = ``;
      this.SearchData.Result.Caption = ``;
      this.RESET_REDDITOR_PROFILE_PHOTO();

      this.SET_REDDITOR_USERNAME(this.ParsedUsername);

      if (this.SearchData.Username.length < 3) {
        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `Kullanıcı adı minimum 3 karakter olmalı 😔`;
        return;
      }

      await this.GET_API_USERNAME_AVAILABLE();

      if (this.Search.UsernameAvailable) {
        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `u/${this.ParsedUsername} böyle bi kullanıcı yok 😫`;
        return
      }

      try {
        await this.GET_API_REDDITOR_DATA();

        await this.GET_API_REDDITOR_SUBMISSIONS();
        await this.GET_API_REDDITOR_COMMENTS();

        if (this.Redditor.Submissions.length > 0 || this.Redditor.Comments.length > 0) {
          this.SearchData.Result.State = ResultState.Failure;
          this.SearchData.Result.Caption = `Hain b*lgurlu seni 😡. ${this.Redditor.Submissions.length} gönderin, ${this.Redditor.Comments.length} yorumun var. 😱`;
        } else {
          this.SearchData.Result.State = ResultState.Success;
          this.SearchData.Result.Caption = `Temizsin. 🤗`;
        }

        this.$router.push({
          name: 'User',
          params: {
            username: this.Redditor.Username
          }
        })
      } catch (e) {
        console.error(e);

        this.SearchData.RateLimit.NextTry = moment().add(
          this.SearchData.RateLimit.Amount,
          this.SearchData.RateLimit.Unit
        );

        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `API çalışmıyo mq. ${
          _.capitalize(this.SearchData.RateLimit.NextTry.from(moment()))
        } tekrar dene.`;
      } finally {
        this.SearchData.IsLoading = false;
      }
    }
  },
});
</script>
