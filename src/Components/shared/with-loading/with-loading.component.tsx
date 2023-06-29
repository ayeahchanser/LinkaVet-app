import React from "react";
import { Spin } from "antd";
import "./with-loading.css";

function LoadingMessage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip="Wait a moment..." size="large" style={{ width: 200 }}>
        <div className="content" style={{ width: 200 }} />
      </Spin>
    </div>
  );
}

interface Props {
  loading: boolean;
}

function withLoading<T>(ChildComponent: React.ComponentType<any>) {
  return class extends React.Component<{}, Props> {
    constructor(props: any) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        await JSON.parse(localStorage.getItem("user") || "null");
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      return <ChildComponent {...(this.props as T)} />;
    }
  };
}

export default withLoading;
