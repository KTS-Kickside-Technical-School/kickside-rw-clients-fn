import articleImage from "../../assets/images/GettyImages-2084803237.webp"
import AdvertsmentSection from "./AdvertsmentSection"
const Hero = () => {
    return (
        <div className="hero">
            <div className="top">
                <div className="left">
                    <div className="cont">
                        <img src={articleImage} alt="" />
                        <div className="texts">
                            <div className="type">
                                <span>
                                    AI
                                </span>
                            </div>
                            <h3>
                                <a href="">
                                    ChatGPT Search is not OpenAI’s ‘Google killer’ yet
                                </a>
                            </h3>
                            <div className="author">
                                <a href="">
                                    John Doe - 10,Dec 2024
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="cont second">
                        <img src={articleImage} alt="" />
                        <div className="texts">
                            <div className="type">
                                <span>
                                    AI
                                </span>
                            </div>
                            <h3>
                                <a href="">
                                    ChatGPT Search is not OpenAI’s ‘Google killer’ yet
                                </a>
                            </h3>
                            <div className="author">
                                <a href="">
                                    John Doe - 10,Dec 2024
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="cont second">
                        <img src={articleImage} alt="" />
                        <div className="texts">
                            <div className="type">
                                <span>
                                    AI
                                </span>
                            </div>
                            <h3>
                                <a href="">
                                    ChatGPT Search is not OpenAI’s ‘Google killer’ yet
                                </a>
                            </h3>
                            <div className="author">
                                <a href="">
                                    John Doe - 10,Dec 2024
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="headlines">
                <div className="head">
                    <h2>
                        Top headlines
                    </h2>
                    <ul>
                        <li>
                            <a href="">
                                Amazon brings generative AI-powered recaps
                                to Prime Video
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Amazon brings generative AI-powered recaps
                                to Prime Video
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Amazon brings generative AI-powered recaps
                                to Prime Video
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Amazon brings generative AI-powered recaps
                                to Prime Video
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Amazon brings generative AI-powered recaps
                                to Prime Video
                            </a>
                        </li>
                    </ul>
                </div>
                <AdvertsmentSection />
            </div>
        </div>
    )
}

export default Hero
