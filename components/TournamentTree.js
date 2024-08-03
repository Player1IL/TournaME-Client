import React, { useState, useEffect } from 'react';
import styles from './TournamentTree.module.css';

const TournamentTree = ({ initialParticipants = 8, playerNames = [], isEditing = false, onPlayerNameChange }) => {
    const [participants, setParticipants] = useState(initialParticipants);
    const [treeData, setTreeData] = useState(playerNames.length ? playerNames : Array.from({ length: initialParticipants }, (_, i) => `Seed ${i + 1}`));

    useEffect(() => {
        setParticipants(initialParticipants);
        setTreeData(playerNames.length ? playerNames : Array.from({ length: initialParticipants }, (_, i) => `Seed ${i + 1}`));
    }, [initialParticipants, playerNames]);

    const handleNameChange = (index, value) => {
        const updatedNames = [...treeData];
        updatedNames[index] = value;
        setTreeData(updatedNames);
        onPlayerNameChange(index, value);
    };

    const totalRounds = Math.ceil(Math.log2(participants));
    const rounds = Array.from({ length: totalRounds }, () => []);

    for (let i = 0; i < participants; i += 2) {
        rounds[0].push([treeData[i], treeData[i + 1]]);
    }

    for (let i = 1; i < totalRounds; i++) {
        const previousRound = rounds[i - 1];
        for (let j = 0; j < previousRound.length / 2; j++) {
            rounds[i].push([`Winner of ${i}-${j * 2}`, `Winner of ${i}-${j * 2 + 1}`]);
        }
    }

    return (
        <div className={styles.treeContainer}>
            <div className={styles.tree}>
                {rounds.map((round, roundIndex) => (
                    <div key={roundIndex} className={styles.round}>
                        {round.map((match, matchIndex) => (
                            <div key={matchIndex} className={styles.match}>
                                {match.map((participant, participantIndex) => (
                                    <div key={participantIndex} className={styles.participant}>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={participant}
                                                onChange={(e) => handleNameChange(roundIndex * participants + matchIndex * 2 + participantIndex, e.target.value)}
                                                className={styles.participantInput}
                                            />
                                        ) : (
                                            participant
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
                <div className={styles.champion}>Champion</div>
            </div>
        </div>
    );
};

export default TournamentTree;
