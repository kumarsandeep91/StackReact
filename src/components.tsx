import * as React from "react";
import { useStyletron } from "styletron-react";
import InfiniteScroll from "react-infinite-scroller";

const Questions = () => {
  const [css] = useStyletron();
  const [hasMore, setHasMore] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    // const url = `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=activity&site=stackoverflow`;
    const url = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.items.map((item: any) => {
          return (
            <div key={item.question_id}>
              <p>{item.owner.display_name}</p>
              <p>{item.title}</p>
              <p>{item.creation_date}</p>
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
    // <div className={css({ display: "grid", gridGap: "8px" })}>
    //   <div
    //     className={css({
    //       display: "grid",
    //       gridGap: "8px",
    //       gridTemplateColumns: "auto auto auto",
    //     })}
    //   >
    //     <h6>Author</h6>
    //     <h6>Title</h6>
    //     <h6>Creation Date</h6>
    //   </div>
    //   {/* Data from stackoverflow */}

    // </div>
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
  );
};

export default Questions;
