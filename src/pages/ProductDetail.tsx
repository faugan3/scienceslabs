import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check, Truck, Shield, Award, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  // Mock product data with variants
  const productData = {
    beakers: {
      id: 'beakers',
      name: 'Béchers en Verre Borosilicate',
      category: 'Équipement de Chimie',
      basePrice: 8500,
      description: 'Béchers graduées en verre borosilicate de haute qualité, résistants aux chocs thermiques.',
      longDescription: 'Ces béchers en verre borosilicate sont spécialement conçus pour les laboratoires d\'enseignement. Ils offrent une excellente résistance aux variations de température et aux produits chimiques. Les graduations sont précises et durables, permettant des mesures fiables pour toutes vos expériences.',
      rating: 4.8,
      reviews: 24,
      sku: 'BCH-SERIES',
      images: [
        'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      variants: [
        { 
          id: 'BCH-050', 
          name: 'Bécher 50ml', 
          capacity: '50 mL', 
          price: 8500, 
          originalPrice: 10000,
          inStock: true, 
          stockQuantity: 25,
          image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        { 
          id: 'BCH-100', 
          name: 'Bécher 100ml', 
          capacity: '100 mL', 
          price: 12000, 
          inStock: true, 
          stockQuantity: 20,
          image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        { 
          id: 'BCH-150', 
          name: 'Bécher 150ml', 
          capacity: '150 mL', 
          price: 15000, 
          inStock: true, 
          stockQuantity: 18,
          image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        { 
          id: 'BCH-200', 
          name: 'Bécher 200ml', 
          capacity: '200 mL', 
          price: 18000, 
          inStock: false, 
          stockQuantity: 0,
          image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      specifications: [
        { label: 'Matériau', value: 'Verre borosilicate 3.3' },
        { label: 'Résistance thermique', value: '-40°C à +500°C' },
        { label: 'Graduations', value: 'Sérigraphiées permanentes' },
        { label: 'Bec verseur', value: 'Optimisé pour versement précis' },
        { label: 'Norme', value: 'ISO 3819' },
        { label: 'Origine', value: 'Europe' }
      ],
      features: [
        'Verre borosilicate de haute qualité',
        'Résistant aux chocs thermiques',
        'Graduations précises et durables',
        'Conforme aux normes ISO',
        'Bec verseur optimisé',
        'Garantie 2 ans'
      ]
    },
    microscope: {
      id: 'microscope',
      name: 'Microscope Binoculaire Éducatif',
      category: 'Équipement de SVT',
      basePrice: 280000,
      description: 'Microscope binoculaire professionnel parfait pour l\'enseignement des sciences de la vie.',
      longDescription: 'Ce microscope binoculaire a été spécialement conçu pour l\'enseignement. Il offre une qualité d\'image exceptionnelle et une facilité d\'utilisation adaptée aux étudiants. Équipé d\'objectifs achromatiques et d\'un système d\'éclairage LED, il garantit des observations précises et confortables.',
      rating: 4.9,
      reviews: 18,
      sku: 'MIC-BIN-001',
      images: [
        'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      variants: [],
      specifications: [
        { label: 'Type', value: 'Binoculaire' },
        { label: 'Objectifs', value: '4x, 10x, 40x, 100x (huile)' },
        { label: 'Oculaires', value: '10x WF (champ large)' },
        { label: 'Grossissement', value: '40x à 1000x' },
        { label: 'Éclairage', value: 'LED 3W variable' },
        { label: 'Platine', value: 'Mécanique 125x125mm' }
      ],
      features: [
        'Optiques achromatiques de qualité',
        'Éclairage LED longue durée',
        'Mise au point macro et micrométrique',
        'Platine mécanique précise',
        'Condenseur Abbe avec diaphragme',
        'Garantie 3 ans'
      ]
    }
  };

  // Determine which product to show based on ID
  const getProductFromId = (productId: string) => {
    if (productId?.startsWith('BCH-')) {
      return productData.beakers;
    } else if (productId === 'MIC-BIN-001') {
      return productData.microscope;
    }
    return productData.beakers; // Default fallback
  };

  const product = getProductFromId(id || '');
  
  // If it's a variant, set it as selected
  React.useEffect(() => {
    if (id?.startsWith('BCH-') && product.variants.length > 0) {
      const variant = product.variants.find(v => v.id === id);
      if (variant) {
        setSelectedVariant(variant);
      } else {
        setSelectedVariant(product.variants[0]);
      }
    }
  }, [id, product]);

  const currentProduct = selectedVariant || {
    name: product.name,
    price: product.basePrice,
    inStock: true,
    stockQuantity: 10,
    image: product.images[0]
  };

  const handleAddToCart = () => {
    addToCart({
      id: selectedVariant ? selectedVariant.id : product.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image || product.images[0],
      quantity: quantity
    });
  };

  const handleVariantSelect = (variant: any) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  // Filter out the currently selected variant from the table
  const availableVariants = product.variants.filter(variant => 
    !selectedVariant || variant.id !== selectedVariant.id
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <Link to="/boutique" className="hover:text-blue-600">Boutique</Link>
          <span>/</span>
          <span className="text-gray-900">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
              <img
                src={selectedVariant?.image || product.images[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg shadow overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Link
                to="/boutique"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la boutique
              </Link>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedVariant ? selectedVariant.name : product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-blue-600">
                  {currentProduct.price.toLocaleString()} FCFA
                </span>
                {selectedVariant?.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {selectedVariant.originalPrice.toLocaleString()} FCFA
                  </span>
                )}
              </div>
              {selectedVariant?.originalPrice && (
                <span className="text-green-600 font-medium">
                  Économisez {(selectedVariant.originalPrice - selectedVariant.price).toLocaleString()} FCFA
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {currentProduct.inStock ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">En stock ({currentProduct.stockQuantity} disponibles)</span>
                </div>
              ) : (
                <div className="text-red-600 font-medium">Rupture de stock</div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {currentProduct.inStock && (
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">Quantité:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(currentProduct.stockQuantity, quantity + 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au panier
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Livraison rapide</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Garantie 2 ans</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Qualité certifiée</p>
              </div>
            </div>

            {/* SKU */}
            <div className="text-sm text-gray-500">
              <span>Référence: {selectedVariant?.id || product.sku}</span>
            </div>
          </div>
        </div>

        {/* Variants Table - Only show if there are variants and available variants */}
        {product.variants.length > 0 && availableVariants.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Autres capacités disponibles</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableVariants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{variant.name}</div>
                        <div className="text-sm text-gray-500">Réf: {variant.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {variant.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-blue-600">
                          {variant.price.toLocaleString()} FCFA
                        </div>
                        {variant.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            {variant.originalPrice.toLocaleString()} FCFA
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {variant.inStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            En stock ({variant.stockQuantity})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Rupture
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/produit/${variant.id}`}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                          >
                            Voir détails
                          </Link>
                          {variant.inStock && (
                            <button
                              onClick={() => {
                                addToCart({
                                  id: variant.id,
                                  name: variant.name,
                                  price: variant.price,
                                  image: variant.image,
                                  quantity: 1
                                });
                              }}
                              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors flex items-center"
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Ajouter
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
                Description
              </button>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Spécifications
              </button>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Avis ({product.reviews})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description détaillée</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Caractéristiques principales</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 text-green-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mb-3">Spécifications techniques</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{spec.label}:</span>
                    <span className="text-gray-700">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;