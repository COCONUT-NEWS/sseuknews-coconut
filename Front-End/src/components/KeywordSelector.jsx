import React from "react";
import KeywordButton from "./KeywordButton";

export default function KeywordSelector({ keywords, selectedKeyword, onSelect }) {
    return (
        <div
            style={{
                width: '100%',
                marginTop: '12px',
                overflowX: 'auto',
                whilteSpace: 'nowrap', // 줄바꿈 방지지
                paddingBottom: '4px',
                scrollbarWidth: 'none', // Firefox
                marginLeft: '8px',
            }}
        >
            {/* 크롬용 스크롤바 숨김 */}
            <style>
                {`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            <div 
                style={{ 
                    display: 'inline-flex', 
                    gap: '8px',
                    paddingRight: '8px',
                }}
            >
                {keywords.map((keyword) => (
                    <KeywordButton
                        key={keyword}
                        keyword={keyword}
                        isSelected={keyword === selectedKeyword}
                        onClick={onSelect}
                    />
                ))}
            </div>

            
        </div>
    );
}