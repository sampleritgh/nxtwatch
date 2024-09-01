import { Component } from 'react';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import Header from '../Header';
import NavigationBar from '../NavigationBar';
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext';
import FailureView from '../FailureView';
import PlayVideoView from '../PlayVideoView';
import { VideoDetailViewContainer, LoaderContainer } from './styledComponents';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class VideoDetailView extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: [],
    isLiked: false,
    isDisliked: false,
  };

  componentDidMount() {
    this.getVideoDetails();
  }

  formattedData = (data) => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  });

  getVideoDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const { match } = this.props;
    const { id } = match.params;
    const jwtToken = Cookies.get('jwt_token');
    const url = https://apis.ccbp.in/videos/${id};
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = this.formattedData(data);
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  clickLiked = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }));
  };

  clickDisliked = () => {
    this.setState((prevState) => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }));
  };

  renderLoadingView = () => (
    <LoaderContainer data-testid="Loader">
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </LoaderContainer>
  );

  renderPlayVideoView = () => {
    const { videoDetails, isLiked, isDisliked } = this.state;
    return (
      <PlayVideoView
        videoDetails={videoDetails}
        clickLiked={this.clickLiked}
        clickDisliked={this.clickDisliked}
      />
    );
  };

  renderFailureView = () => (
    <FailureView onRetry={this.getVideoDetails} />
  );

  renderVideoDetailView = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlayVideoView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <ThemeAndVideoContext.Consumer>
        {({ isDarkTheme }) => {
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9';
          return (
            <>
              <Header />
              <NavigationBar />
              <VideoDetailViewContainer data-testid="videoItemDetails" bgColor={bgColor}>
                {this.renderVideoDetailView()}
              </VideoDetailViewContainer>
            </>
          );
        }}
      </ThemeAndVideoContext.Consumer>
    );
  }
}

export default VideoDetailView;