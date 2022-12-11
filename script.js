// initial value
const initial_value = {
  counters: [
    {
      id: 1,
      value: 0,
      default_value: 0,
      increse_by: 2,
    },
    {
      id: 2,
      value: 1,
      default_value: 1,
      increse_by: 3,
    },
  ],
}

// action type
const inrement_count = 'increment'
const decrement_count = 'decriemen'
const reset_all = 'reset_all'
const add_new_action = 'add_new'

// action createors
// increment
const action_increment = (e) => {
  return {
    type: inrement_count,
    payload: {
      id: e,
    },
  }
}

// decrement
const action_decrement = (e) => {
  return {
    type: decrement_count,
    payload: {
      id: e,
    },
  }
}

// reset
const reset_action = () => {
  return {
    type: reset_all,
  }
}
//  logic
const counter_reducer = (state = initial_value, action) => {
  if (action.type === inrement_count) {
    return {
      ...state,
      counters: state.counters.map((e) =>
        e.id === action.payload.id
          ? { ...e, value: e.value + e.increse_by }
          : { ...e },
      ),
    }
  } else if (action.type === decrement_count) {
    return {
      ...state,
      counters: state.counters.map((e) =>
        e.id === action.payload.id
          ? { ...e, value: e.value - e.increse_by }
          : { ...e },
      ),
    }
  } else if (action.type === add_new_action) {
    let random_value = Math.floor(Math.random() * 10) + 1
    let increse_by_random = Math.floor(Math.random() * 10) + 1
    return {
      ...state,
      counters: [
        ...state.counters,
        {
          id: state.counters.length + 1,
          value: random_value,
          default_value: random_value,
          increse_by: increse_by_random,
        },
      ],
    }
  } else if (action.type === reset_all) {
    return {
      ...state,
      counters: state.counters.map((counter) => ({
        ...counter,
        value: counter.default_value,
      })),
    }
  } else {
    return state
  }
}

// create store
const store = Redux.createStore(counter_reducer)
const render = () => {
  const state = store.getState()
  const total_get_count = state.counters.reduce(
    (cur, pre) => cur + pre.value,
    0,
  )
  total_count.innerText = total_get_count

  wrap_div.innerHTML = state.counters.map(
    (e) => `<div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
        >
        <div id="count" class="text-2xl font-semibold"> ${e.value}</div>
        <div class="flex space-x-3">
          <button
           id=btn_handeler_inc_${e.id}-inc 
           onclick="btn_handeler_inc(${e.id})"
            class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
          >
            Increment
          </button>
          <button
          id=btn_handeler_dec_${e.id}-dec
          
          onclick="btn_handeler_dec(${e.id})"
            class="bg-red-400 text-white px-3 py-2 rounded shadow"
          >
            Decrement
          </button>
        </div>
        </div>`,
  )
}
render()

// increment
let btn_handeler_inc = (e) => {
  store.dispatch(action_increment(e))
}
// decrement
let btn_handeler_dec = (e) => {
  store.dispatch(action_decrement(e))
}

// add new counter
add_new.addEventListener('click', () => {
  return store.dispatch({
    type: add_new_action,
  })
})

// reset
reset.addEventListener('click', () => {
  return store.dispatch(reset_action())
})

store.subscribe(render)
