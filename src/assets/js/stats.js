let data
let currentDate
fetch("./")
  .then((res) => res.json())
  .then((events) => {
    data = events
    currentDate = data.currentDate
    eventStatistic()
    eventStatsUpcoming()
  })
  .catch((err) => console.log(err))

let eventStatistics = document.getElementById("eventStatistics")

function eventStatistic() {
  let assistance = Object.values(data.events).filter((event) => event.assistance)
  let highestAttendance = assistance.reduce((a, b) => (a.assistance > b.assistance ? a : b))
  let lowestAttendance = assistance.reduce((a, b) => (a.assistance < b.assistance ? a : b))
  let capacity = Object.values(data.events).filter((event) => event.capacity)
  let largestCapacity = capacity.reduce((a, b) => (a.capacity > b.capacity ? a : b))
  
  eventStatistics.innerHTML = `
    <tr
      class="bg-white border border-grey-500 md:border-none block md:table-row"
    >
      <td
        class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Highest Attendance</span
        >${highestAttendance.name}
      </td>
      <td
        class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Lowest Attendance</span
        >${lowestAttendance.name}
      </td>
      <td
        class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Largest Capacity</span
        >${largestCapacity.name}
      </td>
    </tr>
  `
}

let upcomingEvents = document.getElementById("eventStatsUpcoming")

function eventStatsUpcoming() {
  let filteredUpcoming = data.events.filter((event) => event.date > currentDate)
  let categories = filteredUpcoming.map((event) => event.category)
  let percentage = filteredUpcoming.map((event) => event.capacity / event.estimate * 100)
  let categoryRow = categories
    .map((category) => {
      return `
      <tr
      class="bg-white border border-grey-500 md:border-none block md:table-row"
      >
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Categories</span
          >${category}
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Revenues</span
          >$
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Percentage of attendance</span
          >%
        </td>
      </tr>
    `
    })
    .join("")
  upcomingEvents.innerHTML = categoryRow
}