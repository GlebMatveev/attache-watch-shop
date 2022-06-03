<script></script>

<template>
  <div class="crumbs">
    <div class="container">
      <ul class="crumbs__list">
        <li class="crumbs__item">
          <RouterLink to="/" class="crumbs__link-bold">Главная ></RouterLink>
        </li>
        <li class="crumbs__item">
          <!-- <RouterLink to="/catalog" class="crumbs__link" href="index.html">
            Каталог
       
          </RouterLink> -->
          <AmBreadcrumbs>
            <template #crumb="{ crumb }">
              <RouterLink class="crumbs__link" :to="crumb.link">
                {{ crumb.label }}
              </RouterLink>
            </template>
          </AmBreadcrumbs>
        </li>
        <!-- <li class="crumbs__item">
          <a class="crumbs__link" href="index.html">РЕМЕШКИ/БРАСЛЕТЫ</a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<style>
.am-breadcrumbs {
  margin: 0 !important;
}
</style>
