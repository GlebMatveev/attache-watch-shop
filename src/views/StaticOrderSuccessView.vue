<template>
  <section class="minimalTop">
    <div class="container">
      <div class="minimalTop__name">
        <h1 class="minimalTop__heading">ПОЗДРАВЛЯЕМ!</h1>
        <hr class="minimalTop__deco" />
        <h2 class="minimalTop__heading-mini">
          ВЫ УСПЕШНО СОВЕРШИЛИ ЗАКАЗ И УЖЕ СОВСЕМ СКОРО С ВАМИ СВЯЖЕТСЯ МЕНЕДЖЕР
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
          to="/collection"
          class="service__mail"
          href="mailto:service@attache.com"
          style="margin-bottom: 200px"
        >
          ПОСМОТРЕТЬ ЧАСЫ
        </RouterLink>
      </div>
    </div>
  </section>
</template>
