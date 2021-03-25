<template>
  <view>
    <view class="e-calendar">
      <view class="e-weeks">
        <view v-for="(item, index) in weeks" :key="index" class="e-weeks_item">{{ item }}</view>
      </view>
      <block v-for="(item, index) in months" :key="index">
        <view class="e-month">
          <view class="e-month_title">{{ item.title }}</view>
          <view class="e-month_list">
            <block v-for="(e, i) in item.days" :key="i">
              <view @click="handleChange(e)" :class="{ 'e-month_item-checked': selectDate === e.date, 'e-month_weekend': e.week === 0 || e.week === 6 }" class="e-month_item">
                <text>{{ e.day || '' }}</text>
              </view>
            </block>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { zeroFill } from '../_utils'

let CURRENTDATE = new Date()
const CURRENTYEAR = CURRENTDATE.getFullYear()
const CURRENTMONTH = CURRENTDATE.getMonth() + 1
const CURRENTDAY = CURRENTDATE.getDate()

export default {
  name: 'ECalendar',
  props: {
    startDate: {
      type: String,
      default: `${CURRENTYEAR}-${zeroFill(CURRENTMONTH)}-${zeroFill(CURRENTDAY)}`
    },
    endDate: {
      type: String,
      default: `${CURRENTYEAR}-${zeroFill(CURRENTMONTH + 4)}-${zeroFill(CURRENTDAY)}`
    },
    defaultDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      months: [],
      selectDate: null
    }
  },
  computed: {
    getClass({ selectDate }) {
      return ({ date }) => {
        if (!date || !selectDate) return ''
        if (selectDate === date) return 'e-month_item-checked'
      }
    }
  },
  watch: {
    defaultDate(n, o) {
      if (n !== o) this.selectDate = n
    }
  },
  created() {
    const { defaultDate } = this
    if (defaultDate) this.selectDate = defaultDate

    this.init()
  },
  methods: {
    handleChange(e) {
      if (!e.date) return
      console.log(e)
      this.selectDate = e.date
      this.$emit('change', e)
    },
    init() {
      const { getMonthBetween, getDays, getTitle, startDate, endDate, formatDate } = this
      const months = []
      const monthBetween = getMonthBetween(formatDate(startDate), formatDate(endDate))
      monthBetween.forEach((item) => {
        months.push({
          days: getDays(item),
          title: getTitle(item)
        })
      })
      this.months = months
    },
    getMonthBetween(start, end) {
      const result = []
      const curr = (start = new Date(start))
      end = new Date(end)
      // eslint-disable-next-line no-unmodified-loop-condition
      while (curr <= end) {
        // 获取此时间的月份
        const month = curr.getMonth() + 1
        result.push(curr.getTime())
        curr.setMonth(month)
      }
      return result
    },
    getTitle(date) {
      const { year, month } = this.getDateInfo(date)
      return `${year}年${zeroFill(month)}月`
    },
    getDays(date) {
      const days = []
      const { year, month, totalDays, beginDays } = this.getDateInfo(date)
      for (let i = 0; i < beginDays; i++) {
        days.push({ date: '' })
      }

      for (let day = 1; day <= totalDays; day++) {
        const date = `${year}-${zeroFill(month)}-${zeroFill(day)}`
        const week = new Date(year, month - 1, day).getDay()
        const config = {
          date,
          year,
          month,
          day,
          week,
          bottomInfo: ''
        }

        days.push(config)
      }
      return days
    },
    // 获取当前时间信息
    getDateInfo(date) {
      date = new Date(date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return {
        year,
        month,
        day,
        totalDays: this.gettotalDays(year, month), // 当月天数
        beginDays: new Date(date.setDate(1)).getDay() // 开始天数
      }
    },
    gettotalDays(year, month) {
      return 32 - new Date(year, month - 1, 32).getDate()
    },
    formatDate(date) {
      return date.replace(/-/g, '/')
    }
  },
  destroyed() {
    CURRENTDATE = null
  }
}
</script>

<style lang="scss" scoped>
.e-calendar {
  width: 100%;
  height: 70vh;
  background: #fff;
}
.e-weeks {
  display: flex;
  &_item {
    flex: 1;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
.e-month {
  &_title {
    line-height: 60rpx;
    text-align: center;
    font-size: 13px;
    color: #999;
  }
  &_list {
    display: flex;
    flex-wrap: wrap;
  }
  &_weekend {
    color: red;
  }
  &_item {
    width: calc(100% / 7);
    height: 108rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    &-checked {
      background: red;
      color: #fff;
    }
  }
}
</style>
