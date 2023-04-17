import React from 'react';
import {Sequence} from 'remotion';
import {Dot} from './Dot';
import {Explosion} from './Explosion';
import {Shrinking} from './Shrinking';
import {Trail} from './Trail';

export const Dots: React.FC = () => {
	return (
		<Explosion>
			<Trail amount={5} extraOffset={0}>
				<Shrinking>
					<Sequence from={0}>
						<Dot />
					</Sequence>
				</Shrinking>
			</Trail>
		</Explosion>
	);
};