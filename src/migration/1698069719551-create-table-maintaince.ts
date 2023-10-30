import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableMaintaince1698069719551 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenance',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'equipment_id',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'maintenance',
      new TableForeignKey({
        columnNames: ['equipment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'equipment',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenance');
  }
}
