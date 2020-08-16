import React from 'react';
import { Button, Switch } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { IMaterial } from '@/types/making';
import materialComponents from '@/components/materials';
import MaterialBlock from '../MaterialBlock';
import styles from './index.less';

export interface IProps {
  materialList: IMaterial[];
  selectMaterial: (m: IMaterial) => void;
  deleteMaterial: (id: number) => void;
  addMaterial: (item: IMaterial, pid?: number, cid?: number) => void;
  dorpMove: (cid: number, tid: number) => void;
  clear: () => void;
}

export interface IState {
    visual: boolean;
}

class MaterialContent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visual: true,
        };
    }

    getMaterilTree(list: IMaterial[]) {
        const result: IMaterial[] = [];
        const data = cloneDeep(list);
        const hash: {
          [props: number]: IMaterial
        } = {};
        data.forEach((_, index) => {
            hash[data[index].id] = data[index];
        });
        data.forEach((item) => {
            const hashVP = hash[(item.pid as number)];
            if (hashVP) {
                if (hashVP.children) {
                    hashVP.children.push(item);
                } else {
                    hashVP.children = [item];
                }
            } else {
                result.push(item);
            }
        });
        return result;
    }

    dropAdd = (index: number, pid: number, id?: number) => {
        this.props.addMaterial(materialComponents[index], pid, id);
    }

    create = () => {

    }

    render() {
        const { visual } = this.state;
        const { materialList } = this.props;
        const materials = this.getMaterilTree(materialList);

        return (
            <>
                <div className={`light-theme ${styles.opt}`}>
                    <Button type="primary" onClick={this.create} style={{ marginRight: '20px' }}>生成</Button>
                    <Button type="primary" onClick={this.props.clear} style={{ marginRight: '20px' }}>清空</Button>
                    展示 <Switch checked={visual} onChange={value => this.setState({ visual: value })} />
                </div>
                <div className={styles.content}>
                    {
                        materials.map((item) => (
                            <MaterialBlock
                                key={item.id}
                                visual={visual}
                                material={item}
                                selectMaterial={(m) => this.props.selectMaterial(m)}
                                deleteMaterial={(id) => this.props.deleteMaterial(id)}
                                dropAdd={this.dropAdd}
                                dorpMove={this.props.dorpMove}
                            />
                        ))
                    }
                </div>
            </>
        );
    }
}

export default MaterialContent;
