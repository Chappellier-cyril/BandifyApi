import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Searchbar from 'src/containers/Searchbar';
import './style.scss';

const Home = ({
  users, isLogged, getMembers, searchedUsers, searchSuccessMessage,
}) => {
  useEffect(() => {
    if (isLogged) {
      // on est connecté, on récupère les membres de la bdd via la requête à l'api
      // qui passe dans le userMiddleware
      getMembers();
    }
  }, []);

  return (
    <div className="main">
      {/* si on est connecté, on affiche la page d'accueil avec la recherche
      et les cartes des membres sont cliquablent */}
      {isLogged ? (
        <>
          <Searchbar />

          <div className="home__cards">
            {users.map(({ id, firstname }) => (
              <Link to={`/member/${id}`} key={id} className="home__cards-users">
                <p>{firstname}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* sinon, on affiche la page d'accueil avec uniquement un aperçu du site :
          la description de Bandify, un boutton redirigeant vers l'inscription
           et des cartes de membres statiques */}
          <p className="home__desc">
            Bienvenue sur Bandify ! <br /> Le réseau social permettant de rencontrer des musiciens
            dans un périmètre géographique donné.
            Pour cela, inscrivez-vous, renseignez vôtre/vosinstrument(s) de prédilection,
            vôtre niveau (optionnel), le(s) style(s) de musique appréciés, les musiciens recherchés
            (bassiste, batteur...) et le périmètre de recherche.
          </p>

          <Link to="/signup" className="home__signup-btn">Rejoindre la communauté</Link>

          <p className="home__desc-teasing">Ils ont déjà rejoint</p>
          <div className="home__cards">
            {users.map(({ id, firstname }) => (
              <p className="home__cards-users" key={id}>{firstname}</p>
            ))}
          </div>
        </>
      )}

      {searchedUsers.length !== 0 && (
        <div className="home__cards">
          <p>{searchSuccessMessage}</p>
          {searchedUsers.map(({ id, firstname }) => (
            <Link to={`/member/${id}`} key={id} className="home__cards-users">
              <p>{firstname}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object,
  ),
  isLogged: PropTypes.bool.isRequired,
  getMembers: PropTypes.func.isRequired,
};
Home.defaultProps = {
  users: [{
    id: null,
    firstname: '',
  }],
};
export default Home;
