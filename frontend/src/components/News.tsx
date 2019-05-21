import React from "react";
import axios from "axios";
import "./News.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

interface Story {
  objectID: string;
  title: string;
  story_title: string;
  author: string;
  created_at: Date;
  created_at_i: number;
  story_url: string;
  url: string;
}

interface State {
  data: Story[];
}

export default class News extends React.Component<{}, State> {
  private url = `${
    process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : ""
  }/stories/`;

  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  public componentDidMount(): void {
    this.reload();
  }

  public reload(): void {
    axios.get(this.url).then(response => {
      this.setState({ data: response.data });
    });
  }

  public delete(objectID: String): void {
    axios.delete(`${this.url}${objectID}`).then(() => {
      this.reload();
    });
  }

  public getDate(time: number): string {
    const current: Date = new Date();
    const date: Date = new Date();
    date.setTime(time);

    const dayFormat = "yyyy/mm/dd";
    if (dateFormat(current, dayFormat) === dateFormat(date, dayFormat)) {
      return dateFormat(date, "h:MM TT");
    }

    current.setTime(current.getTime() - 1000 * 3600 * 24);
    if (dateFormat(current, dayFormat) === dateFormat(date, dayFormat)) {
      return "Yesterday";
    }

    return dateFormat(date, "mmm d");
  }

  render() {
    const { data } = this.state;
    const list: any[] = [];
    data.forEach(e => {
      if (e.story_title || e.title) {
        list.push(
          <div
            key={`${e.objectID}`}
            className="row"
            onClick={() => {
              if (e.story_url) {
                window.open(e.story_url, "_blank");
              } else {
                window.open(e.url, "_blank");
              }
            }}
          >
            <div className="story">
              <div>{e.story_title ? e.story_title : e.title}.</div>
              <div className="author">- {e.author} -</div>
            </div>
            <div className="date">{this.getDate(e.created_at_i)}</div>
            <div>
              <button
                className="deleteButton"
                onClick={event => {
                  event.stopPropagation();
                  this.delete(e.objectID);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        );
      }
    });
    return list ? <div className="box">{list}</div> : <div>No news found</div>;
  }
}
