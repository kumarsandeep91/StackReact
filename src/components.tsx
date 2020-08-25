import * as React from "react";
import ReactModal from "react-modal";
import { useStyletron } from "styletron-react";
import InfiniteScroll from "react-infinite-scroller";
import { dateConvert } from "./helpers";

const Questions: React.FC<{}> = ({}) => {
  const [css] = useStyletron();
  const [hasMore, setHasMore] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({ title: "", link: "" });

  React.useEffect(() => {
    setLoading(true);
    const url = `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=activity&site=stackoverflow`;
    // const url = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.items.map((item: any) => {
          return (
            <div
              onClick={() =>
                handleQuestionClick({ title: item.title, link: item.link })
              }
              key={item.question_id}
              className={css({
                display: "grid",
                gridGap: "1rem",
                gridTemplateColumns: "10% 80% 10%",
                wordWrap: "break-word",
              })}
            >
              <p className={css({ color: "blue" })}>
                {item.owner.display_name}
              </p>
              <p className={css({ color: "blue" })}>{item.title}</p>
              <p className={css({ color: "grey" })}>
                {dateConvert(item.creation_date)}
              </p>
            </div>
          );
        });

        setItems(items.concat(rows));
        setHasMore(data.has_more);
        setLoading(false);
      });
  }, [page]);

  const handleQuestionClick = async (data: { title: string; link: string }) => {
    await setIsOpen(true);
    await setDialogData(data);
  };

  const loadMore = async () => {
    if (loading) return;
    await setPage(page + 1);
  };

  return (
    <div
      className={css({
        display: "grid",
        gridGap: "8px",
      })}
    >
      <div
        className={css({
          width: "100%",
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "10% 80% 10%",
        })}
      >
        <h5>Author</h5>
        <h5>Title</h5>
        <h5>Creation Date</h5>
      </div>
      {/* Data from stackoverflow */}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {items}
      </InfiniteScroll>

      <ReactModal isOpen={isOpen}>
        <div
          className={css({
            display: "grid",
            gridGap: "1rem",
            wordWrap: "break-word",
            justifyItems: "center",
          })}
        >
          <h1 className={css({})}>{dialogData.title}</h1>
          <a target="_blank" href={dialogData.link}>
            Check at StackOverflow
          </a>

          <button
            className={css({
              backgroundColor: "red",
              color: "#fff",
              width: "5rem",
              padding: "0.5rem",
            })}
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Questions;
