import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import { getAge } from 'src/selectors/user';

// == Import : local
import 'src/components/Profiles/style.scss';

const MyProfile = ({
  user,
  onWishToDeleteProfile,
  onDeleteProfile,
  isDeleteModalClosed,
  isProfileDeleted,
  deleteProfileMessage,
}) => {
  // eslint-disable-next-line camelcase
  const { plays, city, member_music_style } = user;

  return (
    <div className="profile__page">
      {/* eslint-disable-next-line camelcase  */}
      {plays && city && member_music_style && isDeleteModalClosed ? (
        <div className="profile">
          <div className="profile__card">
            {/* //TODO => ajouter une photo */}
            <p>{user.firstname}, {user.lastname}</p>
            <h2>Ville: {city.city_name} ({city.code})</h2>
            <h2>{getAge(user.birthdate)} ans</h2>
            <p>{user.birthdate}</p>
            <button
              type="button"
              onClick={onWishToDeleteProfile}
            >Supprimer mon profil
            </button>

            <p>{user.user_description}</p>
            <p>Mes instruments:</p>
            <div className="home__cards">
              <ul>
                {plays.map((play) => (
                  <li key={play.id}>
                    {play.instrument.instrument_name}
                    {play.level.level_name}
                  </li>

                ))}
              </ul>
            </div>
            <p>Mes goûts musicaux:</p>
            <div className="home__cards">
              <ul>
                {member_music_style.map((musicStyle) => (
                  <li key={musicStyle.id}>
                    {musicStyle.music_name}
                  </li>

                ))}
              </ul>
            </div>
            <h2 className="profile__friends-title">Mes amis</h2>
          </div>
        </div>
      ) : (
        <>
          <p>Êtes-vous sûr(e) de vouloir supprimer votre profil?</p>
          <button
            type="button"
            onClick={onDeleteProfile}
          >Oui
          </button>
          <button
            type="button"
            onClick={onWishToDeleteProfile}
          >Non
          </button>
        </>
      )}
      {/* //TODO => Bug à corriger: le message ne s'affiche pas */}
      {isProfileDeleted && (
        <>
          <p>{deleteProfileMessage}</p>
          <Link to="/">Revenir à la page d'accueil</Link>
        </>
      )}
    </div>
  );
};

MyProfile.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    user_description: PropTypes.string,
    city: PropTypes.shape({
      city_name: PropTypes.string,
      code: PropTypes.string,
    }),
    plays: PropTypes.arrayOf(shape({
      instrument: PropTypes.shape({
        instrument_name: PropTypes.string,
      }),
      level: PropTypes.shape({
        level_name: PropTypes.string,
      }),
    })),
    member_music_style: PropTypes.arrayOf(shape({
      music_name: PropTypes.string,
    })),
  }),
  onWishToDeleteProfile: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  isDeleteModalClosed: PropTypes.bool.isRequired,
  isProfileDeleted: PropTypes.bool.isRequired,
  deleteProfileMessage: PropTypes.string.isRequired,
};

MyProfile.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    birthdate: '',
    user_description: '',
    city: {
      city_name: '',
      code: '',
    },
    plays: [
      {
        instrument: {
          instrument_name: '',
        },
        level: {
          level_name: '',
        },
      },
    ],
    member_music_style: [
      {
        music_name: '',
      },
    ],
  },
};

export default MyProfile;