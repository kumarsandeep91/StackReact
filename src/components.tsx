import * as React from "react";
import { useStyletron } from "styletron-react";
import InfiniteScroll from "react-infinite-scroller";
import { dateConvert } from "./helpers";

const Questions = () => {
  const [css] = useStyletron();
  const [hasMore, setHasMore] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

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

  const loadMore = async () => {
    if (loading) return;
    await setPage(page + 1);
  };

  console.log("Array length ????");
  console.log(items.length);
  return (
    <div
      className={css({
        // maxWidth: "700px",
        // width: "100%",
        display: "grid",
        gridGap: "8px",
        // justifyContent: "center",
        // gridAutoFlow: "column",
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
    </div>
  );
};

export default Questions;
