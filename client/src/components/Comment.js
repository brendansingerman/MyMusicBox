import { useState } from "react";

const commentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",

}) => {
    const [text, setText] = useState(initialText);
    const isTextareDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={onSubmit}>
            
        </form>
    )
}