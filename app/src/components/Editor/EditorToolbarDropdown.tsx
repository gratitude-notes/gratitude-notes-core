import { INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { LexicalEditor, $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical';
import { useState } from 'react';
import { BiHeading, BiChevronDown } from 'react-icons/bi';
import { BsTextParagraph } from 'react-icons/bs';
import { RiListUnordered } from 'react-icons/ri';
import useComponentVisible from '../../hooks/useComponentVisible';
import React from 'react';

const EditorToolbarDropdown = ({
    editor,
    blockType,
    blockTypeToBlockName,
}: {
    editor: LexicalEditor;
    blockType: keyof typeof blockTypeToBlockName;
    blockTypeToBlockName: {
        bullet: string;
        check: string;
        code: string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        number: string;
        paragraph: string;
        quote: string;
    };
}): JSX.Element => {
    const formatParagraph = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        });
    };

    const formatHeading = (headingSize: HeadingTagType) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(headingSize));
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const dropdownVisible = useComponentVisible(false);

    const handleDropdown = () => {
        dropdownVisible.isComponentVisible
            ? dropdownVisible.setComponentVisible(false)
            : dropdownVisible.setComponentVisible(true);
    };

    const dropdownVisbileState = dropdownVisible.isComponentVisible ? 'visible' : 'hidden';

    const [currentDropdown, setCurrentDropdown] = useState('Normal');

    const handleCurrentDropdown = (item: string) => {
        setCurrentDropdown(item);
    };

    const renderIcon = () => {
        switch (currentDropdown) {
            case 'Normal':
                return <BsTextParagraph size={25} />;
            case 'Heading 1':
                return <BiHeading size={25} />;
            case 'Heading 2':
                return <BiHeading size={25} />;
            case 'Bullet List':
                return <RiListUnordered size={25} />;
        }
    };

    return (
        <div
            ref={dropdownVisible.ref}
            className="relative flex justify-center items-center cursor-pointer text-black dark:text-white
                                hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in"
        >
            <div onClick={handleDropdown} className="flex gap-2 p-1">
                {renderIcon()}
                <span>{currentDropdown}</span>
                <BiChevronDown size={25} />
            </div>

            {/* Dropdown Menu */}
            <div className={`${dropdownVisbileState} absolute top-full w-52 left-0 z-50`}>
                <div className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-md pt-1 text-black dark:text-white shadow-lg shadow-gray-900">
                    <div
                        onClick={() => {
                            formatParagraph();
                            handleDropdown();
                            handleCurrentDropdown('Normal');
                        }}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in"
                    >
                        <BsTextParagraph size={25} />
                        <span>Normal</span>
                    </div>
                    <div
                        onClick={() => {
                            formatHeading('h1');
                            handleDropdown();
                            handleCurrentDropdown('Heading 1');
                        }}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in"
                    >
                        <BiHeading size={25} />
                        <span>Heading 1</span>
                    </div>
                    <div
                        onClick={() => {
                            formatHeading('h2');
                            handleDropdown();
                            handleCurrentDropdown('Heading 2');
                        }}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in"
                    >
                        <BiHeading size={25} />
                        <span>Heading 2</span>
                    </div>
                    <div
                        onClick={() => {
                            formatBulletList();
                            handleDropdown();
                            handleCurrentDropdown('Bullet List');
                        }}
                        className="flex gap-2 cursor-pointer p-2
                                    hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-100 ease-in"
                    >
                        <RiListUnordered size={25} />
                        <span>Bullet List</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorToolbarDropdown;
