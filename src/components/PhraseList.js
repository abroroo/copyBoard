import React, {useEffect, useState} from 'react';
import '../index.css';


const PhraseList = () => {
    const [phrases, setPhrases] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [newPhrase, setNewPhrase] = useState('');
    const [copyPopup, setCopyPopup] = useState(false);
    const [showContainer, setShowContainer] = useState(false);
    const [phraseScales, setPhraseScales] = useState(false); // Array to store scale values for each phrase
    const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(null);

    const [isInputVisible, setIsInputVisible] = useState(false);



    useEffect(() => {
        // Load phrases from local storage or other data source
        const storedPhrases = localStorage.getItem('phrases');
        if (storedPhrases) {
            setPhrases(JSON.parse(storedPhrases));
        }
    }, []);

    const handleCopyToClipboard = (phrase) => {
        navigator.clipboard.writeText(phrase);
        setCopyPopup(true);
        setTimeout(() => {
            setCopyPopup(false);
        }, 500);


        setPhraseScales(true);

        // Optionally, set the scale back to 1 after a timeout (for animation)
        setTimeout(() => {

            setPhraseScales(false);
        }, 100); // Adjust timeout for desired animation duration
    };

    const handleEditPhrase = (index) => {
        setEditingIndex(index);
    };

    const handleSavePhrase = (index, newPhrase) => {
        const updatedPhrases = [...phrases];
        updatedPhrases[index] = newPhrase;
        setPhrases(updatedPhrases);
        setEditingIndex(-1);
        localStorage.setItem('phrases', JSON.stringify(updatedPhrases));
    };

    const handleDeletePhrase = (index) => {
        const updatedPhrases = [...phrases];
        updatedPhrases.splice(index, 1);
        setPhrases(updatedPhrases);
        localStorage.setItem('phrases', JSON.stringify(updatedPhrases));
    };

    const handleAddPhrase = () => {
        if (newPhrase.trim() !== '') {
            const updatedPhrases = [...phrases, newPhrase];
            setPhrases(updatedPhrases);
            setNewPhrase('');
            localStorage.setItem('phrases', JSON.stringify(updatedPhrases));
        }
    };


    const handleToggleContainer = () => {
        setShowContainer((prevState) => !prevState);
    };
    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible);
    };

    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => {
        const draggedItem = phrases[draggedIndex];
        const updatedPhrases = phrases.filter((_, i) => i !== draggedIndex);
        updatedPhrases.splice(index, 0, draggedItem);
        setPhrases(updatedPhrases);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div>
            <div className={`phrase-list-container ${showContainer ? 'show' : ''}`}>

                <ul className="phrase-list">
                    {phrases.map((phrase, index) => (
                        <div key={index} calssName="list-container">
                            <li key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={() => handleDragOver(index)}
                            onDragEnd={handleDragEnd}
                            className={`phrase-item  ${phraseScales && index === selectedPhraseIndex ? 'scaled' : ''}`}>
                                <span className="phrase-text" onClick={() => { handleCopyToClipboard(phrase); setSelectedPhraseIndex(index); }}>
                                    {phrase}
                                </span>
                            </li>

                            <p className="edit-button" onClick={() => handleDeletePhrase(index)}>
                                x
                            </p>

                        </div>

                    ))}
                    {copyPopup && (
                        <div className="copy-popup">
                            <p>Copied!</p>
                        </div>
                    )}
                </ul>
                <div className="add-phrase-container">
                    {isInputVisible && (
                        <input
                            type="text"
                            className="new-phrase-input"
                            placeholder="Enter a new phrase"
                            value={newPhrase}
                            onChange={(e) => setNewPhrase(e.target.value)}
                        />
                    )}
                    <button className="add-button" onClick={() => {
                        toggleInputVisibility();
                        handleAddPhrase();
                    }}>
                        +
                    </button>
                </div>
            </div>
            <div className="extension-icon" onClick={handleToggleContainer} />
        </div>
    );
};

export default PhraseList;