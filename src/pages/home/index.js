import React, { useState, useEffect } from "react";
import Layout from "../../containers/layout/index";
import { useHistory } from "react-router-dom";
import "./home.css";

function Home() {
  const history = useHistory();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotación automática de características
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🍽️",
      title: "Gestión de Recetas",
      description: "Explora y gestiona tu colección de recetas culinarias",
      action: "Ver Recetas",
      path: "/recetas",
      color: "#00B19C"
    },
    {
      icon: "📦",
      title: "Control de Inventario",
      description: "Mantén un control preciso de tus ingredientes",
      action: "Gestionar Inventario",
      path: "/inventario",
      color: "#28a745"
    },
    {
      icon: "🤖",
      title: "Inteligencia Artificial",
      description: "Descubre cómo la IA revoluciona la creación de recetas",
      action: "Explorar IA",
      path: "/ai-integration",
      color: "#6f42c1"
    },
    {
      icon: "📋",
      title: "Órdenes y Pedidos",
      description: "Crea y gestiona órdenes de manera eficiente",
      action: "Crear Orden",
      path: "/pedidos",
      color: "#fd7e14"
    },
    {
      icon: "📊",
      title: "Historial de Compras",
      description: "Revisa el historial completo de tus compras",
      action: "Ver Historial",
      path: "/historial-compras",
      color: "#17a2b8"
    },
    {
      icon: "📚",
      title: "Documentación",
      description: "Consulta la documentación completa del sistema",
      action: "Ver Documentación",
      path: "/documentation",
      color: "#20c997"
    }
  ];



  const handleFeatureClick = (path) => {
    history.push(path);
  };

  return (
    <Layout title="Home">
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="gradient-text">Sistema de Gestión Culinaria</span>
                <br />
                <span className="subtitle">Potenciado por Inteligencia Artificial</span>
              </h1>
              <p className="hero-description">
                Descubre una nueva forma de gestionar recetas, inventario y crear órdenes 
                con la ayuda de Google Gemini Flash 2.5. Una experiencia culinaria revolucionaria.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn btn-primary hero-btn"
                  onClick={() => history.push("/pedidos")}
                >
                  <i className="fas fa-rocket me-2"></i>
                  Crear Mi Primera Orden
                </button>
                <button 
                  className="btn btn-outline-primary hero-btn-secondary"
                  onClick={() => history.push("/ai-integration")}
                >
                  <i className="fas fa-brain me-2"></i>
                  Explorar IA
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-card">
                <img
                  src="https://cdn2.alegra.com/website/Logos_Alegra/Logotipo-Alegra.png"
                  alt="Alegra Logo"
                  className="alegra-logo"
                />
                <div className="card-glow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-star me-2"></i>
                Explora Nuestras Funcionalidades
              </h2>
              <p className="section-subtitle">
                Descubre todas las herramientas que tenemos para ti
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`feature-card ${currentFeature === index ? 'active' : ''}`}
                  onClick={() => handleFeatureClick(feature.path)}
                  style={{ 
                    '--feature-color': feature.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <button className="feature-action">
                      {feature.action}
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                  <div className="feature-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">
                ¿Listo para Revolucionar tu Experiencia Culinaria?
              </h2>
              <p className="cta-description">
                Únete a miles de usuarios que ya están disfrutando de la potencia de la IA en la cocina
              </p>
              <div className="cta-actions">
                <button 
                  className="btn btn-primary cta-btn"
                  onClick={() => history.push("/pedidos")}
                >
                  <i className="fas fa-play me-2"></i>
                  Comenzar Ahora
                </button>
                <button 
                  className="btn btn-outline-light cta-btn-secondary"
                  onClick={() => history.push("/recetas")}
                >
                  <i className="fas fa-book-open me-2"></i>
                  Ver Recetas
                </button>
                <button 
                  className="btn btn-outline-light cta-btn-secondary"
                  onClick={() => history.push("/documentation")}
                >
                  <i className="fas fa-file-alt me-2"></i>
                  Documentación
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h4><i className="fas fa-user me-2"></i>Desarrollador</h4>
                <p><strong>Edgar Junior Otero Rada</strong></p>
                <p>Prueba Técnica Alegra</p>
              </div>
              <div className="col-md-6">
                <h4><i className="fas fa-code me-2"></i>Tecnologías</h4>
                <div className="tech-badges">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Google Gemini</span>
                  <span className="tech-badge">Bootstrap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
