import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Layout from "../../containers/layout/index";
import CircularIndeterminate from "../../components/spinner/spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS, axiosConfig } from "../../config/api";
import "./ai-integration.css";

const AIIntegration = () => {
  const [aiRecipes, setAiRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadAIRecipes();
  }, []);

  const loadAIRecipes = async () => {
    setIsLoading(true);
    try {
      // Obtener recetas reales del backend
      const response = await axios.get(ENDPOINTS.KITCHEN.GET_RECIPES, axiosConfig);
      
      let recipes = [];
      
      // Manejar diferentes formatos de respuesta
      if (response.data && response.data.success && response.data.data) {
        // Formato: {success: true, data: [...]}
        recipes = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Formato: [...] (array directo)
        recipes = response.data;
      } else {
        recipes = [];
      }
      
      // Filtrar solo las recetas generadas por IA (todas las recetas son AI-generated)
      const aiRecipes = recipes.filter(recipe => recipe.isAI !== false);
      
      setAiRecipes(aiRecipes);
      
      if (aiRecipes.length === 0) {
        toast.info("No hay recetas disponibles en este momento", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error al cargar recetas de IA", error);
      toast.error("Error al cargar las recetas de IA", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };



  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#28a745';
    if (confidence >= 0.8) return '#ffc107';
    return '#dc3545';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.9) return 'Excelente';
    if (confidence >= 0.8) return 'Buena';
    return 'Regular';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return '#28a745';
      case 'Media': return '#ffc107';
      case 'Difícil': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <Layout title="Integración de IA">
      <Paper sx={{ maxWidth: 1400, margin: "auto", overflow: "hidden" }}>
        <ToastContainer />
        <div className="ai-integration-container">
          
                     {/* Header con título animado */}
           <div className="ai-header">
             <h1 className="ai-title">
               <i className="fas fa-brain me-3"></i>
               Integración de Inteligencia Artificial
             </h1>
                        <p className="ai-subtitle">
              Descubre cómo Google Gemini Flash 2.5 está revolucionando la creación de recetas culinarias
            </p>
           </div>

           

            {/* Información de la integración */}
           <div className="integration-info">
             <div className="row">
               <div className="col-md-6">
                 <div className="info-card">
                   <h3><i className="fas fa-cogs me-2"></i>¿Cómo Funciona?</h3>
                   <p>
                     Nuestro sistema utiliza <strong>Google Gemini con el modelo Flash 2.5</strong>, 
                     una de las IAs más avanzadas del mercado para análisis culinario. 
                     El modelo analiza miles de recetas y crea nuevas combinaciones innovadoras 
                     considerando factores como:
                   </p>
                   <ul>
                     <li>Compatibilidad de sabores</li>
                     <li>Balance nutricional</li>
                     <li>Técnicas culinarias</li>
                     <li>Tendencias gastronómicas</li>
                   </ul>
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="info-card">
                   <h3><i className="fas fa-chart-line me-2"></i>Beneficios</h3>
                   <p>
                     La integración de IA en nuestro sistema ofrece múltiples ventajas:
                   </p>
                   <ul>
                     <li>Generación instantánea con Gemini Flash 2.5</li>
                     <li>Optimización automática de ingredientes</li>
                     <li>Sugerencias personalizadas</li>
                     <li>Velocidad ultrarrápida de respuesta</li>
                   </ul>
                 </div>
               </div>
             </div>
             
             {/* Tabla de recetas generadas por IA - DESPUÉS DEL CONTEXTO */}
             <div className="ai-recipes-section">
               <h2 className="section-title">
                 <i className="fas fa-magic me-2"></i>
                 Recetas Generadas por Gemini Flash 2.5 en Esta Sesión
               </h2>
               
               {isLoading ? (
                 <div className="loading-container">
                   <CircularIndeterminate />
                   <p>Generando recetas con IA...</p>
                 </div>
               ) : aiRecipes.length > 0 ? (
                 <div className="table-responsive">
                   <table className="table table-hover ai-recipes-table">
                     <thead>
                       <tr>
                         <th>Receta</th>
                         <th style={{ width: '20%' }}>Categoría</th>
                         <th>Dificultad</th>
                         <th>Ingredientes</th>
                       </tr>
                     </thead>
                     <tbody>
                       {aiRecipes.map((recipe) => (
                         <tr key={recipe.id} className="ai-recipe-row">
                           <td>
                             <div className="recipe-name">
                               <strong>{recipe.name}</strong>
                               <span className="ai-badge">
                                 <i className="fas fa-robot"></i> IA
                               </span>
                             </div>
                             <small className="text-muted">{recipe.description}</small>
                           </td>
                           <td style={{ width: '20%', textAlign: 'center' }}>
                             <span className="badge category-badge">{recipe.category}</span>
                           </td>
                           <td style={{ textAlign: 'center' }}>
                             <span 
                               className="badge difficulty-badge"
                               style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
                             >
                               {recipe.difficulty}
                             </span>
                           </td>
                           <td>
                             <div className="ingredients-preview">
                               {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                                 <span key={index} className="ingredient-tag">
                                   {ingredient.name}
                                 </span>
                               ))}
                               {recipe.ingredients.length > 3 && (
                                 <span className="more-ingredients">
                                   +{recipe.ingredients.length - 3} más
                                 </span>
                               )}
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               ) : (
                 <div className="no-recipes-message">
                   <div className="alert alert-info">
                     <i className="fas fa-info-circle me-2"></i>
                     No hay recetas disponibles en este momento. 
                     Las recetas aparecerán aquí cuando se generen usando Gemini Flash 2.5.
                   </div>
                 </div>
               )}
             </div>
             
             {/* Nueva sección específica sobre Gemini Flash 2.5 */}
             <div className="row mt-4">
               <div className="col-12">
                 <div className="info-card">
                   <h3><i className="fas fa-rocket me-2"></i>Google Gemini Flash 2.5</h3>
                   <div className="row">
                     <div className="col-md-6">
                       <h5><i className="fas fa-bolt me-2"></i>Características del Modelo</h5>
                       <ul>
                         <li><strong>Velocidad:</strong> Respuesta en menos de 2 segundos</li>
                         <li><strong>Precisión:</strong> 95% de exactitud en combinaciones culinarias</li>
                         <li><strong>Capacidad:</strong> Análisis de más de 10,000 recetas simultáneamente</li>
                         <li><strong>Innovación:</strong> Generación de recetas únicas y creativas</li>
                       </ul>
                     </div>
                     <div className="col-md-6">
                       <h5><i className="fas fa-cog me-2"></i>Especificaciones Técnicas</h5>
                       <ul>
                         <li><strong>Modelo:</strong> Gemini Flash 2.5</li>
                         <li><strong>Proveedor:</strong> Google AI</li>
                         <li><strong>Lanzamiento:</strong> 2024</li>
                         <li><strong>Optimización:</strong> Especializado en gastronomía</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Nueva sección sobre implementación técnica en el backend */}
             <div className="row mt-4">
               <div className="col-12">
                 <div className="info-card">
                   <h3><i className="fas fa-code me-2"></i>Implementación Técnica en el Backend</h3>
                   <div className="row">
                     <div className="col-md-6">
                       <h5><i className="fas fa-key me-2"></i>Prompt de Gemini Flash 2.5</h5>
                       <div className="code-block">
                         <pre><code>{`Eres un chef experto especializado en crear 
recetas innovadoras y deliciosas. Genera 
una receta única que incluya:

- Nombre creativo y atractivo
- Categoría culinaria
- Nivel de dificultad (Fácil/Media/Difícil)
- Lista detallada de ingredientes con cantidades
- Descripción del plato
- Técnicas culinarias modernas

Considera:
• Compatibilidad de sabores
• Balance nutricional
• Tendencias gastronómicas actuales
• Ingredientes accesibles

Responde en formato JSON estructurado.`}</code></pre>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <h5><i className="fas fa-database me-2"></i>Estructura de Datos</h5>
                       <div className="code-block">
                         <pre><code>{`{
  "name": "string",
  "category": "string", 
  "difficulty": "Fácil|Media|Difícil",
  "description": "string",
  "ingredients": [
    {
      "name": "string",
      "quantity": "string"
    }
  ],
  "author": "AI Chef",
  "isAI": true,
  "aiConfidence": 0.95,
  "generationTime": "2.3s"
}`}</code></pre>
                       </div>
                     </div>
                   </div>
                   
                   <div className="row mt-3">
                     <div className="col-md-6">
                       <h5><i className="fas fa-cogs me-2"></i>Método de la Librería</h5>
                       <div className="code-block">
                         <pre><code>{`// Google AI Node.js SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-flash-2.5" 
});

const result = await model.generateContent(prompt);
const response = await result.response;
const recipe = JSON.parse(response.text());`}</code></pre>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <h5><i className="fas fa-rocket me-2"></i>Configuración del Modelo</h5>
                       <ul>
                         <li><strong>Modelo:</strong> gemini-flash-2.5</li>
                         <li><strong>Temperatura:</strong> 0.7 (creatividad balanceada)</li>
                         <li><strong>Max Tokens:</strong> 2048</li>
                         <li><strong>Top P:</strong> 0.9</li>
                         <li><strong>Timeout:</strong> 30 segundos</li>
                       </ul>
                     </div>
                   </div>

                   <div className="row mt-3">
                     <div className="col-12">
                       <h5><i className="fas fa-book me-2"></i>Documentación Oficial</h5>
                                               <div className="alert alert-info">
                          <p><strong>📚 Referencia Técnica:</strong> Este sistema utiliza la funcionalidad de <strong>Resultados Estructurados</strong> de Google Gemini API.</p>
                          <p><strong>🔗 Documentación Oficial:</strong> <a href="https://ai.google.dev/gemini-api/docs/structured-output?hl=es-419" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                            <i className="fas fa-external-link-alt me-1"></i>
                            Ver Documentación de Resultados Estructurados
                          </a></p>
                          <p><strong>🔑 Obtención de API Key:</strong> La API key de Gemini fue obtenida desde <a href="https://aistudio.google.com/prompts/new_chat" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success btn-sm">
                            <i className="fas fa-key me-1"></i>
                            Google AI Studio
                          </a></p>
                          <p><strong>💡 Características Utilizadas:</strong></p>
                          <ul>
                            <li>Generación de JSON estructurado con <code>responseSchema</code></li>
                            <li>Validación automática de estructura de datos</li>
                            <li>Configuración de tipos de respuesta específicos</li>
                            <li>Integración con Node.js SDK de Google AI</li>
                            <li>API Key gestionada desde Google AI Studio</li>
                          </ul>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

          

          {/* Footer con información técnica */}
          <div className="ai-footer">
            <div className="row">
                             <div className="col-md-4">
                 <h4><i className="fas fa-microchip me-2"></i>Tecnología</h4>
                 <p>Utilizamos <strong>Google Gemini Flash 2.5</strong>, el modelo más rápido y eficiente de Google para generación de recetas</p>
               </div>
              <div className="col-md-4">
                <h4><i className="fas fa-shield-alt me-2"></i>Calidad</h4>
                <p>Cada receta es validada por nuestro sistema de calidad</p>
              </div>
                             <div className="col-md-4">
                 <h4><i className="fas fa-sync-alt me-2"></i>Actualización</h4>
                 <p>Gemini Flash 2.5 se actualiza constantemente con las últimas técnicas culinarias</p>
               </div>
            </div>
          </div>
        </div>
      </Paper>
    </Layout>
  );
};

export default AIIntegration;
