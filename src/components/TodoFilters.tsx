import { TodoInfo, TaskFilter } from "../types/types";

type Props = {
  setFilter: (filter: TaskFilter) => void;
  filter: TaskFilter;
  TodoInfo: TodoInfo;
};

export default function TodoFilters({setFilter, filter, TodoInfo}: Props) {
  return (
    <div className="buttons">
      <button
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
      </button>
    </div>
  );
}
