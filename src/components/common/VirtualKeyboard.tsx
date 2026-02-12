import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
    onChange: (input: string) => void;
    inputName: string;
    keyboardRef: React.MutableRefObject<any>;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onChange, inputName, keyboardRef }) => {
    const [layoutName, setLayoutName] = useState("default");

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayoutName(layoutName === "default" ? "shift" : "default");
        }
    };

    return (
        <div className="virtual-keyboard-container text-gray-900 fixed bottom-0 left-0 right-0 bg-gray-100 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
            <Keyboard
                keyboardRef={r => (keyboardRef.current = r)}
                inputName={inputName}
                layoutName={layoutName}
                onChange={onChange}
                onKeyPress={onKeyPress}
                display={{
                    '{bksp}': '⌫',
                    '{enter}': 'Valider',
                    '{shift}': '⇧',
                    '{space}': 'Espace',
                    '{lock}': 'CAPS',
                    '{tab}': 'Tab',
                }}
                theme={"hg-theme-default hg-layout-default myTheme"}
            />
        </div>
    );
};
