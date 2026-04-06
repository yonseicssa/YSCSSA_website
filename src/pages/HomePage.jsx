import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>延世大学中国学生学者联合会</h1>
        <p className="subtitle">Yonsei Chinese Students and Scholars Association</p>
        <p>连接中国学子，传承文化精神，共创美好未来</p>
        <Link to="/about" className="cta-button">
          了解更多
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
