let data
let currentDate
fetch("https://amazing-events.onrender.com/api/events")
  .then((res) => res.json())
  .then((events) => {
    data = events
    currentDate = data.currentDate
    eventStatistic()
    eventStatsUpcoming()
    eventStatsPast()
  })
  .catch((err) => console.log(err))

let eventStatistics = document.getElementById("eventStatistics")

function eventStatistic() {
  let assistance = data.events.filter((event) => event.assistance)
  let highestAttendance = assistance.reduce((a, b) =>
    a.assistance > b.assistance ? a : b
  )
  let lowestAttendance = assistance.reduce((a, b) =>
    a.assistance < b.assistance ? a : b
  )
  let capacity = Object.values(data.events).filter((event) => event.capacity)
  let largestCapacity = capacity.reduce((a, b) =>
    a.capacity > b.capacity ? a : b
  )

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
  let revenue = filteredUpcoming.map((event) => event.price * event.estimate)
  let percentage = filteredUpcoming.map((event) =>
    Math.round((event.estimate * 100) / event.capacity)
  )
  let objectEvents = []
  for (let i = 0; i < categories.length; i++) {
    objectEvents[i] = {
      category: categories[i],
      revenue: revenue[i],
      percentage: percentage[i],
    }
  }

  let categoryRow = objectEvents
    .map((element) => {
      return `
      <tr
      class="bg-white border border-grey-500 md:border-none block md:table-row"
      >
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Categories</span
          >${element.category}
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Estimated Revenue</span
          >${element.revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Percentage of attendance</span
          >${element.percentage}%
        </td>
      </tr>
    `
    })
    .join("")
  upcomingEvents.innerHTML = categoryRow
}

let pastEvents = document.getElementById("eventStatsPast")

function eventStatsPast() {
  let filteredPast = data.events.filter((event) => event.date < currentDate)
  console.log(filteredPast)
  let categories = filteredPast.map((event) => event.category)
  let revenue = filteredPast.map((event) => event.price * event.assistance)
  let percentage = filteredPast.map((event) =>
    Math.round((event.assistance * 100) / event.capacity)
  )
  let objectEvents = []
  for (let i = 0; i < categories.length; i++) {
    objectEvents[i] = {
      category: categories[i],
      revenue: revenue[i],
      percentage: percentage[i],
    }
  }

  let categoryRow = objectEvents
    .map((element) => {
      return `
      <tr
      class="bg-white border border-grey-500 md:border-none block md:table-row"
      >
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Categories</span
          >${element.category}
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Revenues</span
          >${element.revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </td>
        <td
          class="p-2 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Percentage of attendance</span
          >${element.percentage}%
        </td>
      </tr>
    `
    })
    .join("")
  pastEvents.innerHTML = categoryRow
}
