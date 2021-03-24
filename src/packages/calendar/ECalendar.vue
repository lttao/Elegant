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
              <view @click="handleChange(e)" :class="getClass(e)" class="e-month_item">
                {{ e.text }}
              </view>
            </block>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
let CURRENTDATE = new Date()
const CURRENTYEAR = CURRENTDATE.getFullYear()
const CURRENTMONTH = CURRENTDATE.getMonth()
const CURRENTDAY = CURRENTDATE.getDate()

export default {
  name: 'ECalendar',
  props: {
    startDate: {
      type: Number,
      default: CURRENTDATE.getTime()
    },
    endDate: {
      type: Number,
      default: new Date(CURRENTYEAR, CURRENTMONTH + 4, CURRENTDAY).getTime()
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
  created() {
    this.init()
  },
  methods: {
    handleChange(e) {
      console.log(e)
      this.selectDate = e.date
      this.$emit('change', e)
    },
    init() {
      const { startDate, endDate } = this
      const months = []
      const monthBetween = this.getMonthBetween(startDate, endDate)
      monthBetween.forEach((item) => {
        months.push({
          days: this.getDays(item),
          title: this.getTitle(item)
        })
      })
      this.months = months
      console.log(months)
    },
    getMonthBetween(start, end) {
      const result = []
      start = new Date(start)
      end = new Date(end)
      const curr = start
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
      return `${year}年${month}月`
    },
    getDays(date) {
      const days = []
      const { year, month, totalDays, beginDays } = this.getDateInfo(date)
      for (let i = 0; i < beginDays; i++) {
        days.push({
          date: undefined,
          type: 'empty',
          text: '',
          bottomInfo: ''
        })
      }

      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day)
        // const type = this.getDayType(date);

        const config = {
          date,
          type: '',
          text: day,
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
