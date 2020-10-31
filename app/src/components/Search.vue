<template>
<div :class="{'search':true,'success':GetResultState=='success','failure':GetResultState=='failure'}">
  <div class="search-input">
    <Icon isClickable=true url="img/icons/Search.svg" width="24" height="24" @click="search()" />
    <input class="text" type="text" @keypress.enter="search()" placeholder="Kullanıcı adını giriniz" v-model="SearchData.Username">
    <div class="loading" v-show="isLoading">🕸</div>
    <Icon isClickable=true :url="`url(${Redditor.ProfilePhoto.URL})`" v-show="Redditor.ProfilePhoto.URL" borderRadius="1em" width="48px" height="48px" :link="`https://reddit.com/user/${ParsedUsername}`" />
  </div>
  <div class="caption" v-show="SearchData.Result.State">
    {{SearchData.Result.Caption}}
  </div>
</div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.search {
  font-family: 'Poppins', sans-serif;
  font-size: 10.5pt;
  font-weight: normal;

  width: 900px;
  height: 94px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

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

import Icon from '@/components/Icon.vue';

type Data = {
  SearchData: {
    Username: string,
    Result: {
      Caption: string
      State: string
    },
    IsLoading: true
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
        Username: '',
        Result: {
          Caption: '',
          State: '',
        },
        IsLoading: true
      },
    }
  },

  components: {
    Icon
  },

  computed: {
    ParsedUsername(): string {
      const result = /([\w-]+)$/i.exec(this.SearchData.Username)
      return result == null ? "" : result[1];
    },

    GetResultState(): string {
      return this.SearchData.Result.State;
    },

    ...mapState(['Redditor', 'Search']),
    ...mapGetters(
      [
        'API_URL_SUBMISSION',
        'API_URL_COMMENT',
        'API_URL_USERNAME_AVAILABLE',
        'API_URL_REDDITOR',
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
        'SET_SUBMISSIONS',
        'SET_COMMENTS',
        'SET_REDDITOR',
        'SET_USERNAME_AVAILABLE',
        'SET_LAST_SUBMISSION_ACTIVITY_DATE',
        'SET_LAST_COMMENT_ACTIVITY_DATE',
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
      this.SearchData.Result.State = ``;
      this.SearchData.Result.Caption = ``;
      this.RESET_REDDITOR_PROFILE_PHOTO();

      this.SET_REDDITOR_USERNAME(this.ParsedUsername);

      if (this.SearchData.Username.length < 3) {
        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `Kullanıcı adı minimum 3 karakterden oluşmalı`;
        return;
      }

      await this.GET_API_USERNAME_AVAILABLE();

      if (this.Search.UsernameAvailable) {
        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `u/${this.ParsedUsername} böyle bir kullanıcı yok`;
        return
      }

      try {
        await this.GET_API_REDDITOR_DATA();

        await this.GET_API_REDDITOR_SUBMISSIONS();
        await this.GET_API_REDDITOR_COMMENTS();
      } catch {
        this.SearchData.Result.State = ResultState.Failure;
        this.SearchData.Result.Caption = `API hatası meydana geldi. Lütfen tekrar deneyiniz.`;
      }
    }
  },
});
</script>
