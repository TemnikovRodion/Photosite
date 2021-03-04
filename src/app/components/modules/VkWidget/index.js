import React from 'react';
import VK, { CommunityMessages } from "react-vk";

//Стили
import './styles.scss'

export default function VkWidget(props) {

    return (
        <VK>
            <CommunityMessages
                groupId={30082781}
                disableButtonTooltip={Number(1)}
                options={{
                    disableButtonTooltip: 1
                }}
            />
        </VK>
    );
}