import { Component } from "react";
import CountDownTimerButton from "../components/Layout/RegionCenter/CountDonwTimerButton";
import countDown from "../utils/countDown";
// import getRemainingTime from "../getRemainingTime";

class CountdownTimer extends Component {
  state = {
    remainingTime: {
      minutes: "25",
      seconds: "00",
      totalTimeLeft: 1500,
    },
    counterState: "Stopped",
  };

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState({
        remainingTime: countDown(this.state.remainingTime.totalTimeLeft),
      });
    }, 1000);
  };

  startTimerHandler = () => {
    this.setState({ counterState: "Started" });
    this.startTimer();
  };

  pauseTimerHandler = () => {
    this.setState({ counterState: "Paused" });
    clearInterval(this.timerInterval);
  };
  stopTimerHandler = () => {
    this.setState({ counterState: "Stopped" });
    clearInterval(this.timerInterval);
    this.setState({
      remainingTime: this.props.DefaultRemainingTime,
    });
  };
  render() {
    let counterButton;

    switch (this.state.counterState) {
      case "Started":
        counterButton = (
          <CountDownTimerButton click={this.pauseTimerHandler}>
            Pause
          </CountDownTimerButton>
        );
        break;
      case "Paused":
        counterButton = (
          <div className="flex gap-2 justify-center">
            <CountDownTimerButton click={this.startTimerHandler}>
              Continue
            </CountDownTimerButton>
            <CountDownTimerButton click={this.stopTimerHandler}>
              Stop
            </CountDownTimerButton>
          </div>
        );

        break;
      case "Stopped":
        counterButton = (
          <CountDownTimerButton click={this.startTimerHandler}>
            Start
          </CountDownTimerButton>
        );
        break;
      default:
        counterButton = (
          <CountDownTimerButton click={this.startTimerHandler}>
            Start
          </CountDownTimerButton>
        );
    }

    return (
      <div className="border-t-2 border-x-2 sm:border-t-4 sm:border-x-4 rounded-3xl px-5 pt-5 pb-2 sm:px-10 sm:pb-4 after:yes border-y-none mx-auto mb-4 sm:rounded-full ">
        <div className="text-5xl mb-4 sm:text-7xl sm:m-4 relative">
          <div className="bgShadow" />
          {this.state.remainingTime.minutes} :{" "}
          {this.state.remainingTime.seconds}
        </div>
        <p>Focus</p>
        {counterButton}
      </div>
    );
  }
}

CountdownTimer.defaultProps = {
  countdownTime: 10,
  DefaultRemainingTime: {
    minutes: "25",
    seconds: "00",
    totalTimeLeft: 1500,
  },
};
export default CountdownTimer;
