import React from 'react'
import screen from '../img/Screen.png'

export default function Home() {
  return (
    <div className='container-home'>
        <h1>Le super Chi-Fou-Mi</h1>

        <h3 className='rules'>Les fameuses règles (Selon un bot)</h3>
        <p className='desc'>Le jeu du Chi-Fou-Mi est un jeu de hasard et d'anticipation, pratiqué par les enfants avec leurs mains. Le jeu oppose un minimum de deux joueurs. Le but du jeu est de choisir un objet qui bat l'objet choisi par l'adversaire. Les joueurs décident simultanément de leur choix et le montrent en même temps. Le gagnant est déterminé par les choix des joueurs : la pierre bat les ciseaux, mais est battue par le papier ; les ciseaux battent la feuille mais sont battus par la pierre ; la feuille bat la pierre mais est battue par les ciseaux. Si les deux joueurs font le même choix, on considère qu'il y a égalité.</p>
        <img src={screen} className='img'  alt='chi-fou-mi' />
        <p className='desc'>Le jeu est souvent utilisé pour prendre des décisions de manière aléatoire, ou pour trancher un conflit. Il est aussi utilisé pour désigner un joueur au hasard, par exemple pour commencer une partie ou pour effectuer une substitution.</p>
    </div>
  )
}
