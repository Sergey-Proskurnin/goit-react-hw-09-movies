import React from 'react';

export default function Cast({ cast }) {
  return (
    <div>
      {cast.length > 0 ? (
        cast.map(({ cast_id, character, name, profile_path }) => (
          <li key={cast_id}>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
            )}
            <h3>{name}</h3>
            <p>Character: {character}</p>
          </li>
        ))
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
}
