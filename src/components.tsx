import * as React from "react";
import { useStyletron } from "styletron-react";
import InfiniteScroll from "react-infinite-scroll-component";

const Questions = () => {
  const [css] = useStyletron();
  const [hasMore, setHasMore] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const url = `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=activity&site=stackoverflow`;
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

        setItems([...items].concat(rows));
        setHasMore(data.hasMore);
      });
  }, [page]);

  const handleNext = () => {
    console.log("????? Fetching Next ?????????????");
    setPage(page + 1);
  };

  return (
    <div className={css({ display: "grid", gridGap: "8px" })}>
      <div
        className={css({
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "auto auto auto",
        })}
      >
        <h6>Author</h6>
        <h6>Title</h6>
        <h6>Creation Date</h6>
      </div>
      {/* Data from stackoverflow */}
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={handleNext}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        {items}
      </InfiniteScroll>
    </div>
  );
};

export default Questions;
