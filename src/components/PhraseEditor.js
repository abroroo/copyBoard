import React, { useState } from 'react';
import '../index.css';
import { FaCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const PhraseEditor = ({ phrase, onSave, onCancel }) => {
    const [editedPhrase, setEditedPhrase] = useState(phrase);

    const handleSavePhrase = () => {
        onSave(editedPhrase);
    };

    const handleCancelEdit = () => {
        onCancel();
    };




    return (
        <div className="phrase-editor-container">
            <input
                type="text"
                className="edited-phrase-input"
                value={editedPhrase}
                onChange={(e) => setEditedPhrase(e.target.value)}
            />
            <button className="save-button" onClick={handleSavePhrase}>
                <FaCheck />
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
                <FaArrowRight />
            </button>

        </div>
    );
};

export default PhraseEditor;