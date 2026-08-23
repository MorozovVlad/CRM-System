import { TodoInfo, TodoFilter } from "../types/types";

type Props = {
  setFilter: (filter: TodoFilter) => void;
  filter: TodoFilter;
  TodoInfo: TodoInfo;
};

export default function TodoFilters({setFilter, filter, TodoInfo}: Props) {
  console.log(TodoInfo);

  const buttons = []

  for (var key in TodoInfo){
    
    const filter = key as TodoFilter;

    buttons.push(
      <button
        className="button-filter"
        onClick={() => {
          setFilter(filter);
        }}
      >
        {key} {TodoInfo[filter]}
      </button>,
    );
  }


  return (
    <div className="buttons">
      {buttons}

      {/* <button
        className={
          filter === "all" ? "button-filter-selected" : "button-filter"
        }
        onClick={() => {
          setFilter("all");
        }}
      >
        Все ({TodoInfo.all})
      </button>
      <button
        className={
          filter === "inWork" ? "button-filter-selected" : "button-filter"
        }
        onClick={() => {
          setFilter("inWork");
        }}
      >
        в работе ({TodoInfo.inWork})
      </button>
      <button
        className={
          filter === "completed" ? "button-filter-selected" : "button-filter"
        }
        onClick={() => {
          setFilter("completed");
        }}
      >
        сделано ({TodoInfo.completed})
      </button> */}
    </div>
  );
}
