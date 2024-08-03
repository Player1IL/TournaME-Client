import React, { useState, useEffect } from 'react';
import styles from './TournamentTree.module.css'; // Import your CSS module

const TournamentTree = ({ initialParticipants, playerNames, isEditing, onPlayerNameChange, onPlayerRemove }) => {
    const [editableIndices, setEditableIndices] = useState([]);
    const [selectedWinners, setSelectedWinners] = useState({});
    const [rounds, setRounds] = useState([]);
    const [totalRounds, setTotalRounds] = useState(0); // Add state for totalRounds

    useEffect(() => {
        updateRounds(initialParticipants, playerNames);
    }, [initialParticipants, playerNames]);

    const updateRounds = (participants, names) => {
        const newTotalRounds = Math.ceil(Math.log2(participants));
        setTotalRounds(newTotalRounds);
        const newRounds = Array.from({ length: newTotalRounds }, () => []);

        // Organize player names into rounds
        for (let i = 0; i < participants; i += 2) {
            newRounds[0].push([names[i] || '', names[i + 1] || '']);
        }

        // Generate subsequent rounds based on previous round winners
        for (let round = 1; round < newTotalRounds; round++) {
            const prevRound = newRounds[round - 1];
            for (let i = 0; i < prevRound.length; i += 2) {
                newRounds[round].push([`Winner of ${round - 1}-${i}`, `Winner of ${round - 1}-${i + 1}`]);
            }
        }

        setRounds(newRounds);
    };

    const handleEditClick = (index) => {
        setEditableIndices((prev) => [...prev, index]);
    };

    const handleSaveClick = (index) => {
        setEditableIndices((prev) => prev.filter(i => i !== index));
    };

    const handleWinnerChange = (round, match, value) => {
        setSelectedWinners((prev) => ({
            ...prev,
            [`${round}-${match}`]: value
        }));
    };

    const renderBracket = (roundIndex, match, index) => {
        const previousRoundWinners = rounds[roundIndex - 1]?.map((m) => m[selectedWinners[`${roundIndex - 1}-${m[0]}`] ? 1 : 0]);

        return (
            <div className={styles.match} key={index}>
                <div className={styles.player}>
                    {rounds[roundIndex][match][0]?.includes('Winner of') ? (
                        <select
                            value={selectedWinners[`${roundIndex}-${match}-0`] || ''}
                            onChange={(e) => handleWinnerChange(roundIndex, `${match}-0`, e.target.value)}
                            className={styles.playerSelect}
                        >
                            <option value="">Select Winner</option>
                            {previousRoundWinners && previousRoundWinners.length > 0 && previousRoundWinners.slice(match * 2, match * 2 + 2).map((winner, idx) => (
                                <option key={idx} value={winner}>{winner}</option>
                            ))}
                        </select>
                    ) : (
                        <>
                            {editableIndices.includes(match * 2) ? (
                                <input
                                    type="text"
                                    value={rounds[roundIndex][match][0] || ''}
                                    onChange={(e) => isEditing && onPlayerNameChange(match * 2, e.target.value)}
                                    className={styles.playerInput}
                                />
                            ) : (
                                <span className={styles.playerName}>{rounds[roundIndex][match][0] || ''}</span>
                            )}
                            {isEditing && rounds[roundIndex][match][0] && !rounds[roundIndex][match][0]?.includes('Winner of') && (
                                <>
                                    <button className={styles.removeButton} onClick={() => onPlayerRemove(match * 2)}>
                                        x
                                    </button>
                                    {editableIndices.includes(match * 2) ? (
                                        <button className={styles.editButton} onClick={() => handleSaveClick(match * 2)}>
                                            ✓
                                        </button>
                                    ) : (
                                        <button className={styles.editButton} onClick={() => handleEditClick(match * 2)}>
                                            ~
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.player}>
                    {rounds[roundIndex][match][1]?.includes('Winner of') ? (
                        <select
                            value={selectedWinners[`${roundIndex}-${match}-1`] || ''}
                            onChange={(e) => handleWinnerChange(roundIndex, `${match}-1`, e.target.value)}
                            className={styles.playerSelect}
                        >
                            <option value="">Select Winner</option>
                            {previousRoundWinners && previousRoundWinners.length > 0 && previousRoundWinners.slice(match * 2, match * 2 + 2).map((winner, idx) => (
                                <option key={idx} value={winner}>{winner}</option>
                            ))}
                        </select>
                    ) : (
                        <>
                            {editableIndices.includes(match * 2 + 1) ? (
                                <input
                                    type="text"
                                    value={rounds[roundIndex][match][1] || ''}
                                    onChange={(e) => isEditing && onPlayerNameChange(match * 2 + 1, e.target.value)}
                                    className={styles.playerInput}
                                />
                            ) : (
                                <span className={styles.playerName}>{rounds[roundIndex][match][1] || ''}</span>
                            )}
                            {isEditing && rounds[roundIndex][match][1] && !rounds[roundIndex][match][1]?.includes('Winner of') && (
                                <>
                                    <button className={styles.removeButton} onClick={() => onPlayerRemove(match * 2 + 1)}>
                                        x
                                    </button>
                                    {editableIndices.includes(match * 2 + 1) ? (
                                        <button className={styles.editButton} onClick={() => handleSaveClick(match * 2 + 1)}>
                                            ✓
                                        </button>
                                    ) : (
                                        <button className={styles.editButton} onClick={() => handleEditClick(match * 2 + 1)}>
                                            ~
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.tournamentTree}>
            {rounds.map((round, roundIndex) => (
                <div className={styles.round} key={roundIndex}>
                    {round.map((match, matchIndex) => renderBracket(roundIndex, matchIndex, matchIndex))}
                </div>
            ))}
            <div className={styles.champion}>
                <select
                    value={selectedWinners[`champion`] || ''}
                    onChange={(e) => handleWinnerChange(totalRounds - 1, 'champion', e.target.value)}
                    className={styles.playerSelect}
                >
                    <option value="">Select Champion</option>
                    {rounds[totalRounds - 1] && rounds[totalRounds - 1].map((match, idx) => (
                        <>
                            <option key={`${idx}-0`} value={match[0]}>{match[0]}</option>
                            <option key={`${idx}-1`} value={match[1]}>{match[1]}</option>
                        </>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TournamentTree;
