import ReactTimeAgo from "react-time-ago";
import { UserData } from "../types";
import "./List.css";

interface ListProps {
  items: [string, UserData][];
  old?: boolean;
}

export function List(props: ListProps) {
  return (
    <div className={"List" + (props.old ? " List--old" : "")}>
      {props.items.map(([key, info]) => (
        <div key={key}>
          <strong>{key}</strong>{" "}
          <span>
            &bull; <ReactTimeAgo date={info.time} />
          </span>
        </div>
      ))}
    </div>
  );
}
