<template>
    <h1 class="text-3xl font-bold mt-3 md:mt-10">{{ greeting }}</h1>
    <h2 class="">{{ tagline }}</h2>
    <p class="" v-if="!availableLocalStorage">Sorry, this app requires local browser storage.</p>
</template>

<script>

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

export default {
    props: {
        greeting: String,
        tagline: String
    },
    data() {
        return {
            availableLocalStorage: storageAvailable("localStorage")
        }
    }
}
</script>
