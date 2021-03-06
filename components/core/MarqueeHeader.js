import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import FontWyler from '../magic/FontWyler'
import FauxWyler from '../magic/FauxWyler'

class MarqueeHeader extends Component {
	constructor (props) {
		super(props)
		this.state = {
			wdColor: 'var(--color-green)'
		}
		this.wordStyles = {
			padding: this.props.isMobileMenu && !this.props.isFAQ ? '0.125em .25em' : '.125em 1em',
			display: 'inline-block',
			fontFamily: 'Art-Sans',
			fontSize: this.props.isMobileMenu && !this.props.isFAQ ? '20vh' : '3em'
		}
		this.speed = this.props.isMobileMenu && !this.props.isFAQ ? '8' : '3'
	}

	componentDidMount () {
		if (this.props.isMobileMenu) {
			this.setState({ wdColor: this.props.activeItem ? 'var(--color-lightblue)' : 'black' })
		} else {
			this.setWdStyleColor()
		}
	}

	componentDidUpdate (prevProps) {
		if (prevProps.title !== this.props.title) {
			if (this.props.isMobileMenu) {
				this.setState({ wdColor: this.props.activeItem ? 'var(--color-lightblue)' : 'black' })
			} else {
				this.setWdStyleColor()
			}
		}
	}

	setWdStyleColor = () => {
		const { title } = this.props
		let color = 'var(--color-lightblue)'
		switch (title) {
			case 'events':
				color = 'var(--color-green)'
				break
			case 'galleries':
				color = 'var(--color-blue)'
				break
			case 'links':
				color = 'var(--color-orange)'
				break
		}
		this.setState({ wdColor: color })
	}

	renderWordDivs = () => {
		const outerWidth = this.outer.getBoundingClientRect().width
		const innerWidth = this.word.getBoundingClientRect().width
		const arr = []
		if (innerWidth > 0) {
			const num = Math.ceil(outerWidth / innerWidth)
			for (let i = 0; i < num * 2; i++) {
				arr.push(this.props.title)
			}
		}
		return arr.map((wd, i) => {
			return (
				<div key={i} className='word' style={this.wordStyles}>
					{/* { i === 0 || i === arr.length - 1
          ? <FauxWyler isMobileMenu={this.props.isMobileMenu} phrase={wd} />
          : <FontWyler isMobileMenu={this.props.isMobileMenu} phrase={wd} />
        } */}
					<FauxWyler isMobileMenu={this.props.isMobileMenu} phrase={wd} />
					<style jsx>{`
          .word {
            animation: marquee${i + 2} ${this.speed}s linear infinite;
            color: ${this.state.wdColor};
            animation-delay: ${(i + 1) * this.speed};
          }
          @keyframes marquee${i + 2} {
            from {
              transform: translateX(0%);
            } to {
              transform: translateX(-100%);
            }
          }
        `}</style>
				</div>
			)
		})
	}

	render () {
		return (
			<div
				ref={outer => {
					this.outer = outer
				}}
				className='outer-container'
				onClick={this.props.handleClick ? this.props.handleClick : null}
			>
				<div className='inner-container'>
					<div
						ref={word => {
							this.word = word
						}}
						className='word'
						style={this.wordStyles}
					>
						{this.props.title}
					</div>
					{this.outer && this.word && this.renderWordDivs()}
				</div>
				<style jsx>{`
        .outer-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100vw;
					position: relative;
					z-index: 9999999999999999;
        }
        .inner-container {
          display: flex;
        }
        .word {
          animation: marquee ${this.speed}s linear infinite;
          color: ${this.state.wdColor};
					position: absolute;
					opacity: 0;
        }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          } to {
            transform: translateX(-100%);
          }
        }
      }
      `}</style>
			</div>
		)
	}
}

MarqueeHeader.propTypes = {
	title: PropTypes.string.isRequired,
	isMobileMenu: PropTypes.bool,
	isFAQ: PropTypes.bool
}

export default MarqueeHeader
