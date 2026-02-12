import React, { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

interface VirtualKeyboardProps {
    onChange: (input: string) => void;
    inputName: string;
    keyboardRef: React.MutableRefObject<any>;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps & { className?: string; layout?: string }> = ({ onChange, inputName, keyboardRef, className = "", layout = "default" }) => {
    const [layoutName, setLayoutName] = useState(layout);

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayoutName(layoutName === "default" ? "shift" : "default");
        }
    };

    return (
        <div className={`virtual-keyboard-container text-gray-900 bg-gray-100 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ${className}`}>
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
                    '@': '@',
                    '.': '.'
                }}
                layout={{
                    'default': [
                        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        'q w e r t y u i o p [ ] \\',
                        'a s d f g h j k l ; \' {enter}',
                        '{shift} z x c v b n m , . / {shift}',
                        '{space}'
                    ],
                    'shift': [
                        '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                        'Q W E R T Y U I O P { } |',
                        'A S D F G H J K L : " {enter}',
                        '{shift} Z X C V B N M < > ? {shift}',
                        '{space}'
                    ],
                    'email': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'a z e r t y u i o p',
                        'q s d f g h j k l m',
                        '{shift} w x c v b n . @ {shift}',
                        '{space} .com .fr'
                    ]
                }}
                theme={"hg-theme-default hg-layout-default myTheme"}
            />
        </div>
    );
};
