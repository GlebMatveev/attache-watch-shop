<template>
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">404</h1>
        <hr class="minimalTop__deco" />
        <h2 class="minimalTop__heading-mini">
          ДАННАЯ СТРАНИЦА НАХОДИТСЯ В СТАДИИ РАЗРАБОТКИ
        </h2>
      </div>
      <div class="minimalTop__container">
        <div class="redline-bold"></div>
      </div>
    </div>
  </section>
  <section class="service">
    <div class="container">
      <div class="service__block">
        <RouterLink
          to="/catalog"
          class="service__mail"
          style="margin-bottom: 200px"
        >
          ПОСМОТРЕТЬ ЧАСЫ
        </RouterLink>
      </div>
    </div>
  </section>
</template>
