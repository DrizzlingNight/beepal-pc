<template>
  <div class="courses-wrapper px-8 py-4">
    <p class="courses-title mb-3">{{ $t('courses.title') }}</p>
    <div class="course-cards-wrapper d-flex flex-wrap justify-space-between">
      <Loading v-if="isLoading" />
      <SpecialStatus v-if="isEmpty" :status-code="1" />
      <div
        v-for="courseData in coursesData"
        :key="courseData.id"
        class="card-wrapper"
      >
        <CourseCard :course-data="courseData" />
      </div>
      <!-- 隱形卡片，讓位填滿3個卡片的時候把卡片往左推 -->
      <div class="ninja-card" style="width: 360px; height: 1px;"></div>
    </div>
  </div>
</template>

<script>
import CourseCard from './components/courseCard'
import Loading from '@/components/loading'
import SpecialStatus from '@/components/specialStatus'

export default {
  components: {
    CourseCard,
    Loading,
    SpecialStatus,
  },
  data() {
    return {
      coursesData: [],
      isLoading: true,
      isEmpty: false,
    }
  },
  methods: {
    async getCoursesInit() {
      try {
        const res = await this.$request({ url: '/subject/', method: 'get' })
        console.log(res)
        this.coursesData = [...res.results]
        if (!this.coursesData.length) {
          this.isEmpty = true
        }
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    },
  },
  created() {
    this.getCoursesInit()
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.courses-wrapper {
  .courses-title {
    font-size: 18px;
    line-height: 25px;
    font-family: 'TC-bold';
  }

  .course-cards-wrapper {
    margin-bottom: 96px;
  }

  .card-wrapper {
    margin-bottom: 30px;
  }
}
</style>
