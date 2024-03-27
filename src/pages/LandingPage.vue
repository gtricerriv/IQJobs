<template>
  <div class="">
    <q-layout style="height: 47.7vw" class="shadow-2 rounded-borders">
      <q-header>
        <q-toolbar>
          <q-avatar>
            <img src="../assets/logotipo.png" alt="logo" />
          </q-avatar>

          <q-toolbar-title>IQ Jobs</q-toolbar-title>

          <q-btn id="btn-early-access" unelevated rounded color="secondary" class="text-white" label="Early Access"
            @click="handleRedirect" />
        </q-toolbar>

      </q-header>

      <q-page-container style="height: 100%;">
        <div class="container flex-center" style="height: 100%;">
          <div class="gradient-cards">
            <div class="card">
              <div class="container-card bg-green-box"
                style="display: flex; align-items: center;justify-content: center; flex-wrap: wrap;">
                <h1 class="card-title" style="width: 100%; font-size: 3rem;">Be Part of The IQ Jobs Family</h1>
                <q-btn id="btn-early-access" unelevated rounded color="white" class="text-blue"
                  style="margin-top: -4rem;" label="Early Access" @click="handleRedirect" />
              </div>
            </div>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>

const handleRedirect = () => {
  window.location.href = '/';
}

</script>

<style lang="scss">
body {
  background: linear-gradient(#1976d2, #26a69a) !important;
}

#btn-early-access:hover {
  background-color: #1976d2;
  color: white;
}

.container {
  width: 1200px !important;
  padding: 0 !important;
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 992px) and (max-width: 1439px) {
    max-width: 1279px !important;
    padding: 0 !important;
    margin: 0 80px !important;
    width: auto !important;
  }

  @media screen and (max-width: 991px) {
    max-width: 959px !important;
    margin: 0 16px !important;
    padding: 0 !important;
    width: auto !important;
  }
}

.gradient-cards {
  display: flex;
  gap: 32px;
  padding: 30px;
  height: 100%;
  align-items: center;

  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
}

.container-title {
  text-align: center;
  padding: 0 !important;
  margin-bottom: 40px;
  font-size: 40px;
  color: #fff;
  font-weight: 600;
  line-height: 60px;
}

.card {
  max-width: 550px;
  border: 0;
  width: 100%;
  margin-bottom: 5rem;
}

.container-card {
  border: 2px solid rgb(187, 187, 200);
  background: linear-gradient(71deg, #1976d2, #1c1c1c, #26a69a);
  border-radius: 5px;
  padding: 40px;
  min-width: 70rem;
  min-height: 20rem;

  img {
    margin-bottom: 32px;
  }
}

.bg-green-box,
.bg-white-box,
.bg-yellow-box,
.bg-blue-box {
  position: relative;
}

.bg-green-box::after,
.bg-white-box::after,
.bg-yellow-box::after,
.bg-blue-box::after {
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;
  content: "";
  z-index: -1;
  border-radius: 45px;
}

.bg-green-box::after {
  background: linear-gradient(71deg, #0d1212, #3da077, #0d1212);
}

.bg-white-box::after {
  background: linear-gradient(71deg, #121013, #b0afb0, #121013);
}

.bg-yellow-box::after {
  background: linear-gradient(71deg, #110e0e, #afa220, #110e0e);
}

.bg-blue-box::after {
  background: linear-gradient(71deg, #0c0a0e, #5f6fad, #0c0a0e);
}

.card-title {
  font-weight: 600;
  color: white;
  letter-spacing: -0.02em;
  line-height: 40px;
  font-style: normal;
  font-size: 28px;
  padding-bottom: 8px;
  text-align: center;
}

.card-description {
  font-weight: 600;
  line-height: 32px;
  color: hsla(0, 0%, 100%, 0.5);
  font-size: 16px;
  max-width: 470px;
}
</style>