import {Component} from 'react' // Fixed import statement
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai' // Fixed spelling of AiOutlineClose
import Header from '../Header' // Added missing quotes
import NavigationBar from '../NavigationBar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import HomeVideos from '../HomeVideos'
import FailureView from '../FailureView'
import {
  HomeContainer,
  BannerContainer,
  BannerImage, // Fixed name from 'Banner Image' to 'BannerImage'
  BannerText,
  BannerButton,
  BannerLeftPart,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
  BannerRightPart,
  BannerCloseButton, // Fixed name from 'Banner CloseButton' to 'BannerCloseButton'
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS', // Changed "IN PROGRESS" to "IN_PROGRESS"
}

class Home extends Component {
  state = {
    homeVideos: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    bannerDisplay: 'flex',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}` // Fixed template literal
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Fixed template literal
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))

      this.setState({
        homeVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onCloseBanner = () => {
    this.setState({bannerDisplay: 'none'})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResults = () => {
    this.getVideos()
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </LoaderContainer>
  )

  renderVideosView = () => {
    const {homeVideos} = this.state
    return <HomeVideos homeVideos={homeVideos} onRetry={this.onRetry} />
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderHomeVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, bannerDisplay} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#ffffff' // Set appropriate background colors
          const textColor = isDarkTheme ? '#ffffff' : '#231420' // Set appropriate text colors
          const display = bannerDisplay === 'flex' ? 'flex' : 'none'

          return (
            <HomeContainer data-testid="home" bgColor={bgColor}>
              <Header />
              <NavigationBar />
              <BannerContainer data-testid="banner" display={display}>
                <BannerLeftPart>
                  <BannerImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-ing.png"
                    alt="nxt watch logo"
                  />
                  <BannerText>
                    Buy Nxt Watch Premium prepaid plans with <br /> UPI
                  </BannerText>
                  <BannerButton type="button">GET IT NOW</BannerButton>
                </BannerLeftPart>
                <BannerRightPart>
                  <BannerCloseButton
                    data-testid="close"
                    onClick={this.onCloseBanner}
                  >
                    <AiOutlineClose size={25} />
                  </BannerCloseButton>
                </BannerRightPart>
              </BannerContainer>
              <SearchContainer>
                <SearchInput
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeInput}
                  color={textColor}
                />
                <SearchIconContainer
                  data-testid="searchButton"
                  onClick={this.getSearchResults}
                >
                  <AiOutlineSearch size={20} />
                </SearchIconContainer>
              </SearchContainer>
              {this.renderHomeVideos()}
            </HomeContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home
