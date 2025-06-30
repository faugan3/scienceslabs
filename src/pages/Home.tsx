import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beaker, Microscope, Shield, Users, Truck, HeadphonesIcon, Award, Star } from 'lucide-react';

const Home = () => {
  const categories = [
    {
      id: 1,
      name: 'Équipement de Chimie',
      icon: Beaker,
      description: 'Béchers, tubes à essai, burettes, pipettes...',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Béchers et Erlenmeyers', 'Tubes à essai', 'Burettes et Pipettes', 'Balances de précision']
    },
    {
      id: 2,
      name: 'Réactifs',
      icon: Beaker,
      description: 'Produits chimiques pour expériences',
      image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Acides', 'Bases', 'Sels', 'Indicateurs colorés']
    },
    {
      id: 3,
      name: 'Équipement de Physique',
      icon: Shield,
      description: 'Dynamomètres, oscilloscopes, générateurs...',
      image: 'https://images.pexels.com/photos/8847434/pexels-photo-8847434.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Mécanique', 'Électricité', 'Optique', 'Thermodynamique']
    },
    {
      id: 4,
      name: 'Équipement de SVT',
      icon: Microscope,
      description: 'Microscopes, modèles anatomiques, loupe...',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Microscopes', 'Modèles anatomiques', 'Échantillons', 'Matériel de dissection']
    },
    {
      id: 5,
      name: 'Équipement de Sécurité',
      icon: Shield,
      description: 'EPI, douches de sécurité, extincteurs...',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['EPI', 'Douches de sécurité', 'Extincteurs', 'Armoires de sécurité']
    },
    {
      id: 6,
      name: 'Mobilier de Laboratoire',
      icon: Users,
      description: 'Paillasses, tabourets, armoires...',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Paillasses', 'Tabourets', 'Armoires', 'Hottes aspirantes']
    },
    {
      id: 7,
      name: 'Formations',
      icon: Users,
      description: 'Formation et accompagnement pédagogique',
      image: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Sécurité laboratoire', 'Utilisation équipements', 'Pédagogie scientifique']
    },
    {
      id: 8,
      name: 'Divers',
      icon: Award,
      description: 'Accessoires et matériel complémentaire',
      image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=400',
      subCategories: ['Accessoires', 'Consommables', 'Pièces détachées']
    }
  ];

  const services = [
    {
      icon: Truck,
      title: 'Livraison rapide',
      description: 'Livraison dans toute l\'Afrique de l\'Ouest sous 7-14 jours'
    },
    {
      icon: HeadphonesIcon,
      title: 'Support technique',
      description: 'Assistance technique et pédagogique par nos experts'
    },
    {
      icon: Award,
      title: 'Garantie qualité',
      description: 'Matériel certifié et garantie sur tous nos produits'
    },
    {
      icon: Users,
      title: 'Formation incluse',
      description: 'Formation gratuite à l\'utilisation du matériel'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Amadou Traoré',
      role: 'Directeur, Université de Bamako',
      content: 'Sciences Labs nous fournit un matériel de qualité exceptionnelle. Leur service client est remarquable.',
      rating: 5
    },
    {
      name: 'Mme Fatoumata Sidibé',
      role: 'Professeure de Chimie, Lycée Technique',
      content: 'Grâce à Sciences Labs, nos étudiants peuvent enfin faire des expériences pratiques de qualité.',
      rating: 5
    },
    {
      name: 'M. Ibrahim Koné',
      role: 'Responsable Laboratoire, ENSUP',
      content: 'Un partenaire fiable qui comprend nos besoins pédagogiques et nous accompagne dans nos projets.',
      rating: 5
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Kit de Béchers Complet',
      description: 'Set de béchers de 50ml, 100ml, 150ml et 200ml',
      price: 45000,
      originalPrice: 55000,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true
    },
    {
      id: 2,
      name: 'Microscope Éducatif',
      description: 'Microscope binoculaire parfait pour l\'enseignement',
      price: 280000,
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: false
    },
    {
      id: 3,
      name: 'Kit de Sécurité Laboratoire',
      description: 'Équipement de protection individuelle complet',
      price: 125000,
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      isNew: true
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Équipez vos laboratoires avec
              <span className="block text-orange-400">Sciences Labs</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Votre partenaire de confiance pour l'équipement scientifique éducatif en Afrique de l'Ouest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/boutique"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
              >
                Découvrir nos produits
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Catégories de Produits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète d'équipements scientifiques pour tous vos besoins pédagogiques
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="space-y-1">
                      {category.subCategories.slice(0, 3).map((subCat, index) => (
                        <div key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mr-1 mb-1">
                          {subCat}
                        </div>
                      ))}
                      {category.subCategories.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{category.subCategories.length - 3} autres
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600">
              Bien plus qu'un simple fournisseur, nous vous accompagnons dans vos projets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Produits en Vedette
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez nos nouveautés et produits les plus populaires
              </p>
            </div>
            <Link
              to="/boutique"
              className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir tous les produits
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Nouveau
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{product.price.toLocaleString()} FCFA</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {product.originalPrice.toLocaleString()} FCFA
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/boutique"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir tous les produits
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              La satisfaction de nos clients est notre priorité
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à équiper vos laboratoires ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Demander un devis
            </Link>
            <Link
              to="/boutique"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Parcourir le catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;